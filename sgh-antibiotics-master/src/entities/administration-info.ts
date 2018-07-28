import { Dosage } from "./dosage";
import { HepaticFailureDosage } from './hepatic-failure-dosage';

export class AdministrationInfo {
  _id: string;
  administration: string;
  dosages: Dosage[] = [];
  hepaticFailureDosages: HepaticFailureDosage[] = [];
  monitoringParameters = '';
  adverseReactions = '';
  usualAdultDosage = '';
  haemodialysis = '';
  peritonealDialysis = '';
  crrt = '';
  comments = '';
  pregnancy = '';
}
