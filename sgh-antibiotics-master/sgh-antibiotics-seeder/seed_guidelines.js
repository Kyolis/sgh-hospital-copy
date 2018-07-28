const fs = require('fs');
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: `sgh-antibiotics`,
  keyFilename: `./sgh-antibiotics-49a1d9f9be27.json`,
});

const migrateGuidelines = (fileName, displayName) => {
  const guideline = fs.readFileSync(`guidelines/${fileName}.md`, {encoding: 'utf8'});
  firestore.collection(`/hospitals/cgh/dbs/db_1/guidelineGroup`).doc(fileName).set({
    text: guideline,
    name: displayName
  })
    .then((res) => {
    }).catch((err) => console.log(err));
};

migrateGuidelines("basic_guidelines", 'Basic Guidelines');
migrateGuidelines("opat_therapy", 'OPAT Therapy');
migrateGuidelines("oral_conversion", 'IV-to-PO');
migrateGuidelines("uses_of_carbapenems", 'Guidelines for the use of carbapenems');
