const Firestore = require('@google-cloud/firestore');
const knex = require('knex')(require('./knexfile'));

const firestore = new Firestore({
  projectId: 'sgh-antibiotics',
  keyFilename: './sgh-antibiotics-49a1d9f9be27.json',
});

/*let printCollection = (collectionPath) => {
  firestore.collection(collectionPath).get().then(q => {
    console.log('\nPrinting ' + collectionPath);
    q.forEach(doc => console.log(doc.id, " => ", doc.data()))
  });
};*/
/*

let printUserRoles = (docPath) => {
  firestore.doc(docPath).get().then(doc => {
    console.log('Printing document ' + docPath);
    const userRoles = doc.data().roles;
    userRoles.get().then(roles => {
      console.log(roles)
    })
  })
};
*/

/*let printReferencedDocument = (docPath) => {
  firestore.doc(docPath).get().then(doc => {
    console.log('Printing document ',  docPath);
    const dbRef = doc.data().staging_db;
    doc.data().staging_db.get().then(res => {
      console.log(res);
    })
  })
};*/


//printCollection('/hospitals/cgh/dbs');

// printUserRoles('/users/ifEJBhfKldb6lNrAAcge4zGmTz53');

/*printReferencedDocument('/hospitals/cgh');*/

/*

let getStagingDb = firestore.doc('/hospitals/cgh/').get().then(doc => {
    return doc.data().staging_db.get()
  }).catch((err) => console.log(err))

getStagingDb.then(res => {
  console.log(res.data())
  console.log(res.doc('name/1').get().then(name => {
    return name.data()
  }));
}).catch(err => console.error(err))
*/

/*let printRenalDysfunctions = (antibioticId) => {
  return knex(`RenalDysfunction as rd`).where({antibiotic_id: antibioticId})
    .join(`POIV`, `rd.poiv_id`, `=`, `POIV._id`)
    .select(`rd._id`, `POIV.poiv`, `rd.side_effect as adverseReactions`, `rd.max_dose as monitoring-parameters`, `rd.usual_dose as usualAdultDosage`)
    .then(res => {
      return Promise.all(res.map((row) => {
        for (key in row) {
          if (row.hasOwnProperty(key) && /_id$/.test(key)) {
            row[key] = row[key].toString();
          }
        }
        console.log(`Row: `, row);
        return Promise.resolve();
      }))
    }).catch((err) => {
      console.error(`Error fetching RenalDysfunction data: `, err);
      return Promise.reject(err);
    });
};

printRenalDysfunctions(59);*/

/*function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const testAsync = async () => {
  const test1 = async () => {
    await sleep(2000);
    console.log(`test1`);
    return 1;
  };

  const test2 = async (t1) => {
    await sleep(1000);
    console.log("T1 is " + t1);
  };

  const t1 = await test1();
  await test2(5);
};

testAsync().then(() => console.log(`fertsch`)).catch((err) => console.log(`futsch:`, err));*/

async function printRd() {

  //const antibiotics = await knex('Antibiotic').select('_id').map(a => a._id);
  const antibiotics = [10];

  let result = await Promise.all(antibiotics.map(async antibioticId => {

    const queryResult = await knex.select(`rd._id`, `POIV.poiv as administration`, `rd.side_effect as adverseReactions`, `rd.max_dose as indications`,
      `rd.usual_dose as usualAdultDosage`, `rd.clcr1`, `rd.clcr2`, `rd.clcr3`, `rd.clcr4`, `rd.clcrMore`,
      `rd.clcr3050`, `rd.clcr1129`, `rd.clcr10`).from(`RenalDysfunction as rd`).where({antibiotic_id: antibioticId})
      .join(`POIV`, `rd.poiv_id`, `=`, `POIV._id`);

    return Promise.all(queryResult.map(rd => {
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
      delete rd.clcr1;
      delete rd.clcr2;
      delete rd.clcr3;
      delete rd.clcr4;
      delete rd.clcr3050;
      delete rd.clcr1129;
      delete rd.clcr10;
      delete rd.clcrMore;

      const GREATHER_THAN = 0;
      const FROM_TO = 1;
      const LESS_THAN = 2;
      const dosages = [];

      if (clcr1 !== null && clcrMore !== null)
        dosages.push({type: GREATHER_THAN, clcr: clcr1, value: clcrMore});

      if (clcr2 !== null && clcr3050 !== null) {
        const lowHigh = clcr2.split('-');
        dosages.push({type: FROM_TO, clcrLow: lowHigh[0], clcrHigh: lowHigh[1], value: clcr3050});
      }

      if (clcr3 !== null && clcr1129 !== null) {
        const lowHigh2 = clcr3.split('-');
        dosages.push({type: FROM_TO, clcrLow: lowHigh2[0], clcrHigh: lowHigh2[1], value: clcr1129});
      }

      if (clcr4 !== null && clcr10 !== null)
        dosages.push({type: LESS_THAN, clcr: clcr4, value: clcr10});

      rd.dosages = dosages;

      return Promise.resolve(rd);
    }));
  }));

  //result = [].concat.apply([], result).filter(elem => elem !== null);

  const promises = Promise.all(result.map(rd => {
    return firestore.collection("Test").doc(rd._id).set(rd)
  }));

  console.log('Results: ', promises);
}

printRd();
