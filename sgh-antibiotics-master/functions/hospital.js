const utils = require('./utils');

/**
 * Checks if new jobs are to be done for the hospital.
 * @param hospital hospital object
 * @param hospitalDocRef the hospital document reference
 */
function checkForHospitalJobs(hospital, hospitalDocRef) {
  if (!hospital.delete || hospital.delete === 'NO') {
    console.log(`hospital should not be deleted`);
    return Promise.resolve();
  } else {
    console.log(`delete state:`, hospital.delete);

    if (hospital.delete === 'DELETE') {
      hospitalDocRef.update({delete: 'DELETING'}).then(() => {
        console.log(`Start deletion of hospital ${hospital.name}`);
        return deleteHospital(hospital, hospitalDocRef).then(() => {
          console.log(`Hospital ${hospital.id} deleted, finished`);
          return Promise.resolve();
        }).catch(err => Promise.reject(err));
      }).catch(err => Promise.reject(err));
    }
  }
  return Promise.resolve();
}

/**
 * Recursively deletes a hospital with all its subcollections.
 * @param hospital hospital object
 * @param hospitalDocRef the hospital document reference
 */
function deleteHospital(hospital, hospitalDocRef) {
  const allSubcollections = utils.iterateDocumentRecursive(hospitalDocRef.path, docRef => {
    return docRef.getCollections(docRef);
  });

  return allSubcollections.then(subCollections => {
    subCollections.map(subCollection => {
      console.log(subCollection.path);
    });
    return Promise.resolve();
  }).catch(err => Promise.reject(err))
}

exports.checkForHospitalJobs = checkForHospitalJobs;
exports.deleteHospital = deleteHospital;
