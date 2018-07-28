// const user_guide = fs.readFileSync(`../documentation/user_guide.md`, {encoding: 'utf8'});
// const admin_guide = fs.readFileSync(`../documentation/admin_guide.md`, {encoding: 'utf8'});

const fs = require('fs');
const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: `sgh-antibiotics`,
  keyFilename: `./sgh-antibiotics-49a1d9f9be27.json`,
});

const migrateGuides = (fileName, displayName) => {
  const guide = fs.readFileSync(`../documentation/${fileName}.md`, {encoding: 'utf8'});
  firestore.collection(`/guides`).doc(fileName).set({
    text: guide,
    name: displayName
  })
    .then((res) => {
    }).catch((err) => console.log(err));
};

migrateGuides("admin_guide", 'Admin Guide');
migrateGuides("user_guide", 'User Guide');


// const storageRef = firebase.storage().ref();

// storageRef.child('../documentation/img/' + 'abw.jpg');
