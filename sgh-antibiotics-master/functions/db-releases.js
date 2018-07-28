const admin = require('firebase-admin');
const utils = require('./utils');

/**
 * Checks triggers for releases and launches the jobs if not already running.
 * @param hospital the hospital object
 * @param hospitalDocRef the hospital document reference
 * @param previousHospital hospital data before the change
 */
function checkForDbReleaseJobs(hospital, hospitalDocRef, previousHospital) {
  if (!hospital.releases) {
    console.log(`hospital has no releases yet`);
    return Promise.resolve();
  } else {
    console.log(`releases:`, hospital.releases);

    let todos = hospital.releases.filter(release => release.state === "TODO");
    const previousTodos = previousHospital.releases.filter(release => release.state === "TODO");
    // Filter already started todos
    todos = todos.filter(release => previousTodos.indexOf(release) < 0);

    let toDelete = hospital.releases.filter(release => release.state === "DELETE");
    const previousToDelete = previousHospital.releases.filter(release => release.state === "DELETE");
    // Filter already started deletes
    toDelete = toDelete.filter(release => previousToDelete.indexOf(release) < 0);

    return deleteReleases(hospital, hospitalDocRef, toDelete).then(() => {
      if (!todos.length > 0) {
        console.log(`No added releases, finished`);
        return Promise.resolve();
      }
      return createReleases(hospital, hospitalDocRef, todos);
    });
  }
}

/**
 * Creates a new release by copying the `staging_db` to a new document in the `dbs` collection.
 * @param hospital hospital object
 * @param hospitalDocRef the hospital document reference
 * @param todos pending release jobs.
 */
function createReleases(hospital, hospitalDocRef, todos) {

  function createRelease(hospitalDocPath, dbId) {
    return utils.copyDocumentRecursive(`${hospitalDocPath}/dbs/staging_db`, `${hospitalDocPath}/dbs/${dbId}`);
  }

  const todoResults = todos.map((release) => {
    const index = hospital.releases.findIndex(rel => rel.timestamp === release.timestamp);
    const handleError = (err) => {
      console.error(`Error creating release:`, err);
      release.state = "FAILED";
      hospital.releases[index] = release;
      return hospitalDocRef.update({releases: hospital.releases});
    };

    release.state = "IN_PROGRESS";
    hospital.releases[index] = release;
    return hospitalDocRef.update({releases: hospital.releases}).then(() => {
      console.log(`Start creating release ${release.comments}`);
      return createRelease(hospitalDocRef.path, release.timestamp).then(() => {
        release.state = "DONE";
        hospital.releases[index] = release;
        return hospitalDocRef.update({releases: hospital.releases});
      }).catch(err => handleError(err));
    }).catch(err => handleError(err));
  });
  return Promise.all(todoResults);
}

/**
 * Deletes released database versions from the `dbs` collection of the hospital.
 * @param hospital hospital object
 * @param hospitalDocRef the hospital document reference
 * @param releases pending releases to be deleted.
 */
function deleteReleases(hospital, hospitalDocRef, releases) {
  return Promise.all(releases.map(release => {
    const index = hospital.releases.findIndex(rel => rel.timestamp === release.timestamp);
    const handleError = (err) => {
      console.error(`Error deleting release:`, err);
      release.state = "DELETE_FAILED";
      hospital.releases[index] = release;
      return hospitalDocRef.update({releases: hospital.releases});
    };

    const dbDocRef = admin.firestore().doc(`${hospitalDocRef.path}/dbs/${release.timestamp}`);

    const deletePromises = utils.iterateDocumentRecursive(dbDocRef.path, (docRef) => {
      return docRef.delete();
    });

    return deletePromises.then(() => {
      console.log(`Finished deleting release`);
      release.state = "DELETED";
      hospital.releases.splice(index, 1);
      return hospitalDocRef.update({releases: hospital.releases});
    }).catch(err => handleError(err));
  }));
}

exports.checkForDbReleaseJobs = checkForDbReleaseJobs;
exports.deleteReleases = deleteReleases;
exports.createReleases = createReleases;
