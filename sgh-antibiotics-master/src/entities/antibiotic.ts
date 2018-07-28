import { AdministrationInfo } from "./administration-info";
import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface Antibiotic {
  _id: string;
  name: string;
  groupId: string;
  administrationInfos: ReplaySubject<AdministrationInfo[]>;
}
