import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Condition } from './condition';

export class Infection {
  _id: string;
  name: string;
  categoryId: string;
  conditions = new ReplaySubject<Condition[]>(1);
}
