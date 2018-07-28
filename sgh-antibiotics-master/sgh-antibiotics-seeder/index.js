const Firestore = require('@google-cloud/firestore');
const knex = require('knex')(require('./knexfile'));

const firestore = new Firestore({
    projectId: 'sgh-antibiotics',
    keyFilename: './sgh-antibiotics-49a1d9f9be27.json',
});

/*
const roles = firestore.collection('/users/', )*/


/*

const test_ref = firestore.doc('/hospitals/sgh');
firestore.doc('/hospitals/cgh').set({test_ref: test_ref});
*/
/*knex.select('*').from('AntibioticGroup').then(res => {
    res.map((row) => {
        firestore.collection('/hospitals/cgh/dbs/update_db/AntibioticGroup').doc(row._id.toString()).set(row)
            .then((res) => {
            }).catch((err) => console.log(err))
    })
});*/
/*
knex.select('*').from('Antibiotic').then(res => {
    res.map((row) => {
        firestore.collection('/hospitals/cgh/update_db/Antibiotic').doc(row._id.toString()).set(row)
            .then((res) => {
            }).catch((err) => console.log(err))
    })
});
*/


