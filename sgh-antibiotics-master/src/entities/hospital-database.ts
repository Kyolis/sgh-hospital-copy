import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Antibiotic } from './antibiotic';
import { AntibioticGroup } from './antibiotic-group';

export interface HospitalDatabase {
  antibiotic: AngularFirestoreCollection<Antibiotic>;
  antibioticGroup: AngularFirestoreCollection<AntibioticGroup>;
}
