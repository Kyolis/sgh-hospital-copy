import { ReplaySubject } from 'rxjs/ReplaySubject';

export class CopyUtil {
  /**
   * Strips '_id' and Fields of type 'ReplaySubject'.
   * @param obj object to copy.
   * @returns {object} Shallow copy of input without '_id' and 'ReplaySubject's.
   */
  public static copy(obj: object): object {
    let temp = Object.assign({});
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!(obj[key] instanceof ReplaySubject) && key !== '_id') {
          temp[key] = obj[key];
        }
      }
    }
    return temp;
  }
}
