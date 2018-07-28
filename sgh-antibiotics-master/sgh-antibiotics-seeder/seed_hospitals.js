const Firestore = require('@google-cloud/firestore');
const knex = require('knex')(require('./knexfile'));
const fs = require('fs');

const firestore = new Firestore({
  projectId: `sgh-antibiotics`,
  keyFilename: `./sgh-antibiotics-49a1d9f9be27.json`,
});

async function migrateHospital(hospitalId, hospitalName, dbId = `staging_db`) {
  const hospital = {
    id: hospitalId,
    name: hospitalName,
    staging_db: `staging_db`,
    live_db: dbId,
    releases: [],
    deleted: false
  };

  firestore.doc(`/hospitals/${hospitalId}`).set(hospital)
    .then(res => console.log(`Successfully created hospital with id ${hospitalId}`))
    .catch(err => console.err(`Failed to create hospital ${hospitalId}: `, err));

  firestore.doc(`/hospitals/${hospitalId}/dbs/${dbId}`).set({})
    .then(() => console.log(`Created db with id ${dbId}`))
    .catch(err => console.err(`Failed to create db with id ${dbId}: `, err));

  const migrateTable = (tableName, collectionName, dbIdTemp = dbId) => {
    return knex.select(`*`).from(tableName).then(res => {
      return Promise.all(res.map((row) => {
        for (key in row) {
          if (row.hasOwnProperty(key) && /_id$/.test(key)) {
            row[key] = row[key].toString();
          }
        }
        return firestore.collection(`/hospitals/${hospitalId}/dbs/${dbIdTemp}/${collectionName}`).doc(row._id).set(row)
          .then((res) => {
            return Promise.resolve(res);
          }).catch((err) => {
            console.error(err);
            return Promise.reject(err);
          });
      }))
    });
  };

  const migrateAntibiotics = async (dbIdTemp = dbId) => {
    try {
      const antibioticRows = await knex.select(`*`).from(`Antibiotic`);

      return antibioticRows.map(async antibioticRow => {
        for (key in antibioticRow) {
          if (antibioticRow.hasOwnProperty(key) && /_id$/.test(key)) {
            antibioticRow[key] = antibioticRow[key].toString();
          }
        }
        const antibiotic = {name: antibioticRow.antibiotic, groupId: antibioticRow.groupName_id};
        const antibioticDocRef = firestore.collection(`/hospitals/${hospitalId}/dbs/${dbIdTemp}/antibiotics`).doc(antibioticRow._id);
        return antibioticDocRef.set(antibiotic).then(() => {
          console.log(`Antibiotic_ID:`, antibioticRow._id);
          return migrateAdministrationInfos(antibioticDocRef, antibioticRow._id);
        })
      })
    } catch (err) {
      console.error(`Error in migrateAntibiotics():`, err);
      return Promise.reject(err);
    }
  };

  const migrateInfections = async (dbIdTemp = dbId) => {
    try {
      const infectionsRows = await knex.select(`*`).from(`Infections`);

      return infectionsRows.map(async infectionsRow => {
        for (key in infectionsRow) {
          if (infectionsRow.hasOwnProperty(key) && /_id$/.test(key)) {
            infectionsRow[key] = infectionsRow[key].toString();
          }
        }
        const infection = {name: infectionsRow.infect_name, categoryId: infectionsRow.infect_category.toString()};
        const infectionDocRef = firestore.collection(`/hospitals/${hospitalId}/dbs/${dbIdTemp}/infections`).doc(infectionsRow._id);

        return infectionDocRef.set(infection).then(async () => {
          const conditions = await knex('Condition').where({infect_id: infectionsRow._id});
          return conditions.filter(item => item.condition && item.condition.length > 0).map(condition => {
            return firestore.doc(`${infectionDocRef.path}/conditions/${condition._id}`).set({
              name: condition.condition,
              comment: condition.comment
            });
          });
        })
      })
    } catch (err) {
      console.error(`Error in migrateInfections():`, err);
      return Promise.reject(err);
    }
  };

  const migrateInfectionCategories = async (dbIdTemp = dbId) => {
    try {
      const categoryRows = await knex.select(`*`).from(`InfectCategory`);

      return categoryRows.map(categoryRow => {
        for (key in categoryRow) {
          if (categoryRow.hasOwnProperty(key) && /_id$/.test(key)) {
            categoryRow[key] = categoryRow[key].toString();
          }
        }
        const category = {name: categoryRow.cat_name};
        const categoryDocRef = firestore.collection(`/hospitals/${hospitalId}/dbs/${dbIdTemp}/infectionCategories`).doc(categoryRow._id);
        return categoryDocRef.set(category).then(() => {
          return Promise.resolve();
        })
      })
    } catch (err) {
      console.error(`Error in migrateInfectionCategories():`, err);
      return Promise.reject(err);
    }
  };

  const migrateAdministrationInfos = async (antibioticDocRef, antibioticId) => {
    try {
      const administrationInfos = firestore.collection(antibioticDocRef.path + '/administrationInfos');

      const queryResult = await knex.select(`rd._id`, `POIV.poiv as administration`, `rd.side_effect as adverseReactions`, `rd.max_dose as indications`,
        `rd.usual_dose as usualAdultDosage`, `rd.clcr1`, `rd.clcr2`, `rd.clcr3`, `rd.clcr4`, `rd.clcrMore`,
        `rd.clcr3050`, `rd.clcr1129`, `rd.clcr10`).from(`RenalDysfunction as rd`).where({antibiotic_id: antibioticId})
        .join(`POIV`, `rd.poiv_id`, `=`, `POIV._id`);

      return await Promise.all(queryResult.map(rd => {
        for (key in rd) {
          if (rd.hasOwnProperty(key) && /_id$/.test(key)) {
            rd[key] = rd[key].toString();
          }
        }
        const rdId = rd._id;
        const clcr1 = rd.clcr1;
        const clcr2 = rd.clcr2;
        const clcr3 = rd.clcr3;
        const clcr4 = rd.clcr4;
        const clcr3050 = rd.clcr3050;
        const clcr1129 = rd.clcr1129;
        const clcr10 = rd.clcr10;
        const clcrMore = rd.clcrMore;
        delete rd._id;
        delete rd.clcr1;
        delete rd.clcr2;
        delete rd.clcr3;
        delete rd.clcr4;
        delete rd.clcr3050;
        delete rd.clcr1129;
        delete rd.clcr10;
        delete rd.clcrMore;

        const GREATER_THAN = 0;
        const FROM_TO = 1;
        const LESSER_OR_EQUAL = 2;
        const dosages = [];

        if (clcr1 !== null && clcrMore !== null)
          dosages.push({type: GREATER_THAN, clcr: clcr1, value: clcrMore});

        if (clcr2 !== null && clcr3050 !== null) {
          const lowHigh = clcr2.split('-');
          dosages.push({type: FROM_TO, clcrLow: lowHigh[0], clcrHigh: lowHigh[1], value: clcr3050});
        }

        if (clcr3 !== null && clcr1129 !== null) {
          const lowHigh2 = clcr3.split('-');
          dosages.push({type: FROM_TO, clcrLow: lowHigh2[0], clcrHigh: lowHigh2[1], value: clcr1129});
        }

        if (clcr4 !== null && clcr10 !== null)
          dosages.push({type: LESSER_OR_EQUAL, clcr: clcr4, value: clcr10});

        rd.dosages = dosages;

        return administrationInfos.doc(rdId).set(rd)
      }));
    } catch (err) {
      console.error(`Error in migrateAdministrationInfos():`, err);
      return Promise.reject(err);
    }
  };

  const migrateGuidelines = (fileName, displayName) => {
    const guideline = fs.readFileSync(`guidelines/${fileName}.md`, {encoding: 'utf8'});
    firestore.collection(`/hospitals/${hospitalId}/dbs/${dbId}/guidelines`).doc(fileName).set({
      text: guideline,
      name: displayName
    })
      .then((res) => {
      }).catch((err) => console.error(err));
  };

  const fixMiscellaneousAntibioticsGroupStructure = async () => {
    const antibioticGroupRef = firestore.collection(`/hospitals/${hospitalId}/dbs/${dbId}/antibioticGroups/`);
    const miscellaneousGroupsSnapshot = await antibioticGroupRef.where('groupName', '==', 'Miscellaneous').get();
    return Promise.all(miscellaneousGroupsSnapshot.docs.map(async miscellaneousDoc => {
      const antibioticsRef = firestore.collection(`/hospitals/${hospitalId}/dbs/${dbId}/antibiotics/`);
      const antibioticSnapshot = await antibioticsRef.where('groupId', '==', miscellaneousDoc.id).get();
      await Promise.all(antibioticSnapshot.docs.map(async antibioticDoc => {
        return antibioticDoc.ref.update({groupId: null});
      }));
      await miscellaneousDoc.ref.delete()
    }));
  };

  const createFirstRelease = async () => {
    const release = {
      timestamp: Date.now().toString(),
      state: "TODO",
      comments: "Initial release with data imported from old App."
    };
    hospital.releases = [release];
    hospital.live_db = release.timestamp;

    await firestore.doc(`/hospitals/${hospitalId}`).update(hospital);
    console.log(`Created Release`, release);
  };

  const antibioticsGroupMigration = await
    migrateTable(`AntibioticGroup`, `antibioticGroups`);
  const antibioticsMigration = await
    migrateAntibiotics();
  const infectionsMigration = await
    migrateInfections();
  const infectionCategoriesMigration = await
    migrateInfectionCategories();

  return Promise.all([
    antibioticsGroupMigration,
    antibioticsMigration,
    infectionsMigration,
    infectionCategoriesMigration,
    await migrateGuidelines("basic_guidelines", 'Basic Guidelines'),
    await migrateGuidelines("opat_therapy", 'OPAT Therapy'),
    await migrateGuidelines("oral_conversion", 'IV-to-PO'),
    await migrateGuidelines("uses_of_carbapenems", 'Guidelines for the use of carbapenems'),
  ]).then(() => {
    return fixMiscellaneousAntibioticsGroupStructure().then(() => {
      return createFirstRelease()
    });
  }).catch(err => {
    console.error('An error occurred while migrating antibiotics groups and antibiotics.', err);
  });
}

//migrateHospital('demo', 'Demo Hospital');
migrateHospital('test', `Test Hospital (use Demo instead)`);

