const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const dbReleases = require('./db-releases');
const hospitalFunctions = require('./hospital');

// Activate adminInfoTreatment cloud functions
exports.adminInfoTreatment = require('./admin-info-treatment');

// Activate user cloud functions
exports.user = require('./user');

/**
 * Triggers cloud functions when a hospital document changes.
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.hospitalUpdated = functions.firestore
  .document(`/hospitals/{hospitalId}`)
  .onUpdate(event => {
    const previousHospital = event.data.previous.data();
    const hospital = event.data.data();
    const hospitalDocRef = event.data._ref;

    return hospitalFunctions.checkForHospitalJobs(hospital, hospitalDocRef).then(() => {
      return dbReleases.checkForDbReleaseJobs(hospital, hospitalDocRef, previousHospital).then(() => {
        return Promise.resolve();
      }).catch(err => {
        console.error(`checkForDbReleaseJobs: `, err);
        return Promise.reject();
      });
    }).catch(err => {
      console.error(`checkForHospitalJobs: `, err);
      return Promise.reject();
    });
  });
