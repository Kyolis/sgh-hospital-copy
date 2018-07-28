const functions = require("firebase-functions");
const admin = require('firebase-admin');

/**
 * Deletes adminInfoTreatments that link to a Treatment that has been deleted.
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.handleTreatmentDeletion = functions.firestore
  .document(`/hospitals/{hospitalId}/dbs/{dbId}/infections/{infectionId}` +
    `/conditions/{conditionId}/treatments/{treatmentId}`)
  .onDelete(event => {
    const treatmentId = event.params.treatmentId;
    const hospitalId = event.params.hospitalId;
    const dbId = event.params.dbId;
    const infectionId = event.params.infectionId;
    const conditionId = event.params.conditionId;

    console.log(`treatmentId:`, treatmentId);
    console.log(`hospitalId:`, hospitalId);
    console.log(`dbId:`, dbId);
    console.log(`infectionId:`, infectionId);
    console.log(`conditionId:`, conditionId);

    return admin.firestore().collection(`/hospitals/${hospitalId}/dbs/${dbId}/adminInfoTreatments`)
      .where('treatmentId', '==', treatmentId)
      .where('infectionId', '==', infectionId)
      .where('conditionId', '==', conditionId)
      .get().then(snapshots => {
        return Promise.all(snapshots.docs.map(adminInfoTreatment => {
          console.log(`Deleting adminInfoTreatment: `, adminInfoTreatment);
          return adminInfoTreatment.ref.delete();
        }))
      }).catch(err => Promise.reject(err));
  });

/**
 * Deletes adminInfoTreatments that link to an AdministrationInfo that has been deleted.
 * @type {CloudFunction<DeltaDocumentSnapshot>}
 */
exports.handleAdminInfoDeletion = functions.firestore
  .document(`/hospitals/{hospitalId}/dbs/{dbId}/antibiotics/{antibioticId}` +
    `/administrationInfos/{adminInfoId}`)
  .onDelete(event => {
    const hospitalId = event.params.hospitalId;
    const dbId = event.params.dbId;
    const adminInfoId = event.params.adminInfoId;
    const antibioticId = event.params.antibioticId;

    return admin.firestore().collection(`/hospitals/${hospitalId}/dbs/${dbId}/adminInfoTreatments`)
      .where('administrationInfoId', '==', adminInfoId)
      .where('antibioticId', '==', antibioticId)
      .get().then(snapshots => {
        return Promise.all(snapshots.docs.map(adminInfoTreatment => {
          console.log(`Deleting adminInfoTreatment: `, adminInfoTreatment);
          return adminInfoTreatment.ref.delete();
        }))
      }).catch(err => Promise.reject(err));
  });
