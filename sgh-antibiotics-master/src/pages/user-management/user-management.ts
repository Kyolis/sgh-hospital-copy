import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserDetailsPage } from '../user-details/user-details';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Subscription } from 'rxjs/Subscription';

/**
 * The user management UI
 */
@IonicPage()
@Component({
  selector: 'page-user-management',
  templateUrl: 'user-management.html',
})
export class UserManagementPage implements OnDestroy {

  private usersSubscription: Subscription;
  private users: User[] = [];
  private searchTerms: string;

  constructor(public navCtrl: NavController, private userService: UserServiceProvider) {
    this.searchTerms = '';
    this.usersSubscription = this.userService.users.subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    if (this.usersSubscription != null) {
      this.usersSubscription.unsubscribe();
    }
  }

  /**
   * View individual user details.
   * @param {User} user  Email and uid(userId).
   */
  public openUserDetails(user: User) {
    this.navCtrl.push(UserDetailsPage, {user});
  }
}
