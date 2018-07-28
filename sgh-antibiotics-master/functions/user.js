const functions = require('firebase-functions');
const admin = require('firebase-admin');
const utils = require('./utils');

/**
 * Automatically triggered cloud function that adds a new user to the database after registration with firebase auth.
 * @type {CloudFunction<UserRecord>}
 */
exports.onCreateUser = functions.auth.user().onCreate(event => {
  const user = event.data; // The Firebase user.

  console.log('User object: ', user);

  let newUser = {};
  newUser.uid = user.uid;
  if (user.email) newUser.email = user.email;

  return admin.firestore().collection('users').doc(user.uid).set(newUser)
    .then((res) => console.log('User successfully inserted in /users', user))
    .catch((err) => console.error(err));
});

/**
 * Automatically triggered cloud function that deletes a user from database after deleting the account from firebase auth.
 * @type {CloudFunction<UserRecord>}
 */
exports.onDeleteUser = functions.auth.user().onDelete(event => {
  console.log(`onDelete event:`, event);

  const user = event.data;

  utils.deleteCollection(admin.firestore(), `/users/${user.uid}/settings`, [], 10);
  utils.deleteCollection(admin.firestore(), `/users/${user.uid}/roles`, [], 10);

  return admin.firestore().doc(`/users/${user.uid}`).delete()
    .then((res) => console.log(`User ${user.uid} successfully deleted from /users`))
    .catch((err) => console.error(err));
});
