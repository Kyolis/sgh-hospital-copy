const admin = require('firebase-admin');

/**
 * Copies the Document recursively with every Subcollection
 * @param fromPath Path of the document to copy from.
 * @param toPath Path of the document to be created.
 */
function copyDocumentRecursive(fromPath, toPath) {
  const fromDocRef = admin.firestore().doc(fromPath);
  const toDocRef = admin.firestore().doc(toPath);
  return fromDocRef.get().then(fromDoc => {
    const allPromises = fromDocRef.getCollections(fromDocRef).then(collections => {
      return Promise.all(collections.map(collection => {
        // console.log(`Found collection: ${collection.path}`);
        return collection.get().then(querySnapshot => {
          return Promise.all(querySnapshot.docs.map(snapshot => {
            const newToPath = `${toPath}/${collection.id}/${snapshot.ref.id}`;
            console.log(`Found doc: `, snapshot.ref.path, ` copy to: `, newToPath);
            return copyDocumentRecursive(snapshot.ref.path, newToPath);
          })).catch(err => Promise.reject(err));
        }).catch(err => Promise.reject(err))
      }));
    }).catch(err => Promise.reject(err));

    return allPromises.then(() => {
      return toDocRef.set(fromDoc.data())
        .then(() => Promise.resolve())
        .catch(err => {
          console.error(`Error setting document. fromDoc:`, fromDoc, `fromDoc.data():`, fromDoc.data());
          Promise.reject(err)
        });
    }).catch(err => Promise.reject(err));

  }).catch(err => Promise.reject(err));
}

function iterateDocumentRecursive(docPath, callback) {
  const docRef = admin.firestore().doc(docPath);
  return docRef.get().then(doc => {
    const allPromises = docRef.getCollections(docRef).then(collections => {
      return Promise.all(collections.map(collection => {
        return collection.get().then(querySnapshot => {
          return Promise.all(querySnapshot.docs.map(snapshot => {
            return iterateDocumentRecursive(snapshot.ref.path, callback);
          })).catch(err => Promise.reject(err));
        }).catch(err => Promise.reject(err))
      }));
    }).catch(err => Promise.reject(err));

    return allPromises.then(() => {
      return callback(docRef)
    }).catch(err => Promise.reject(err));

  }).catch(err => Promise.reject(err));
}

function deleteRecursively(docPath) {
  const docRef = admin.firestore().doc(docPath);
  return Promise.all(docRef.getCollections(docRef).then(subCollections => {
    return deleteAllSubCollections(subCollections).then(() => {
      return docRef.delete();
    }).catch(() => Promise.reject())
  }).catch(() => Promise.reject())).then(() => {
    console.log(`deleteRecursively finished`);
  });
}

const deleteAllSubCollections = (subCollections) => {
  if (subCollections.length < 1)
    return Promise.resolve();

  console.log(`subCollections:`, subCollections);
  return Promise.all(subCollections.map(collection => {
    const newSubcollections = [];
    console.log(`collection`, collection);
    return deleteCollection(admin.firestore(), collection.path, newSubcollections, 10).then(() => {
      return Promise.all(newSubcollections).then(subColPromises => {
        return Promise.all(subColPromises.map(subCol => {
          return deleteAllSubCollections(subCol);
        }))
      })
    });
  }))
};

// From https://firebase.google.com/docs/firestore/manage-data/delete-data
function deleteCollection(db, collectionPath, subCollections, batchSize) {
  const collectionRef = db.collection(collectionPath);
  const query = collectionRef.orderBy('__name__').limit(batchSize);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, batchSize, subCollections, resolve, reject);
  });
}

function deleteQueryBatch(db, query, batchSize, subCollections, resolve, reject) {
  query.get()
    .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size === 0) {
          return 0;
        }

        // Delete documents in a batch
        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          subCollections.push(doc.ref.getCollections(doc.ref));
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          return snapshot.size;
        });
      }
    ).then((numDeleted) => {
    if (numDeleted === 0) {
      resolve();
      return;
    }

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      deleteQueryBatch(db, query, batchSize, subCollections, resolve, reject);
    });
  })
    .catch(reject);
}

exports.copyDocumentRecursive = copyDocumentRecursive;
exports.iterateDocumentRecursive = iterateDocumentRecursive;
exports.deleteCollection = deleteCollection;
exports.deleteRecursively = deleteRecursively;

