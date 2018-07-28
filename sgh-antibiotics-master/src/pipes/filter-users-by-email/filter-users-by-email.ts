import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs/Observable';

/**
 * Filters Users by the email field.
 */
@Pipe({
  name: 'filterUsersByEmail',
  pure: true
})
export class FilterUsersByEmailPipe implements PipeTransform {

  /**
   * Filter users by email.
   */
  transform(userList: Observable<User>, searchTerm: string) {
    if (!userList) return userList;
    searchTerm = searchTerm.toLowerCase();
    return userList.filter((user) => {
      return typeof user.email !== "undefined" && user.email.startsWith(searchTerm);
    });
  }
}
