const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: `sgh-antibiotics`,
  keyFilename: `./sgh-antibiotics-49a1d9f9be27.json`,
});

/**
 * Copies the Document recursively with every Subcollection
 * @param fromPath Path of the document to copy from.
 * @param toPath Path of the document to be created.
 */
function copyDocumentRecursive(fromPath, toPath) {
  const fromDocRef = firestore.doc(fromPath);
  const toDocRef = firestore.doc(toPath);
  return fromDocRef.get().then(fromDoc => {
    fromDocRef.getCollections(fromDocRef).then(collections => {
      collections.map(collection => {
        console.log(`Found collection: ${collection.path}`);
        return collection.get().then(querySnapshot => {
          querySnapshot.forEach(snapshot => {
            const newToPath = `${toPath}/${collection.id}/${snapshot.ref.id}`;
            console.log(`Found doc: `, snapshot.ref.path, ` copy to: `, newToPath);
            return copyDocumentRecursive(snapshot.ref.path, newToPath);
          });
        }).catch(err => Promise.reject(err))
      });
    }).catch(err => Promise.reject(err));
    toDocRef.set(fromDoc.data());
    return Promise.resolve(`Finished copying`);
  }).catch(err => Promise.reject(err));
}

function createRelease(hospitalDocPath, dbId) {
  copyDocumentRecursive(`${hospitalDocPath}/dbs/staging_db`, `${hospitalDocPath}/dbs/${dbId}`).then(() => {
    console.log(`Release creation successful: dbId: ${dbId}`);
    firestore.doc(hospitalDocPath).update({live_db: dbId}).then(() => {
      console.log(`Successfully changed live_db to:${dbId}`);
    }).catch(err => console.error(err));
  }).catch(err => console.error(err));
}

createRelease(`/hospitals/cgh`, dbId = Date.now().toString());
