export class AdminInfoTreatment {
  _id: string;
  // this reference is only used since the ids of the migrated data are not globally unique
  antibioticId: string;
  // this reference is only used since the ids of the migrated data are not globally unique
  infectionId: string;
  // this reference is only used since the ids of the migrated data are not globally unique
  conditionId: string;
  // saving only this id should be sufficient when not working with migrated data
  treatmentId: string;
  // saving only this id should be sufficient when not working with migrated data
  administrationInfoId: string;
  dosage: string;
  comment: string;
  isOptional: boolean;
  isAdditional: boolean;
  created: number;
}
