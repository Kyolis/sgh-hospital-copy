import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Treatment } from './treatment';

export interface Condition {
  _id: string;
  name: string;
  treatments: ReplaySubject<Treatment[]>;
  comment: string;
  laboratoryTesting: string;
  additionalInformation: string;
}
