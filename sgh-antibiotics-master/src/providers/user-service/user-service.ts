import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Session, SessionServiceProvider } from '../session-service/session-service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

/**
 * Provider for subscribing and managing User data.
 */
@Injectable()
export class UserServiceProvider {

  private userCollection: AngularFirestoreCollection<User>;
  private userCollectionSubscription: Subscription;
  private session: Session;
  users = new ReplaySubject<User[]>(1);

  constructor(private afs: AngularFirestore, private sessionService: SessionServiceProvider) {
    this.session = new Session();

    this.sessionService.state.subscribe((session) => {
      this.session = session;
      if (session.loggedIn && session.isSuperadmin) {
        this.userCollection = this.afs.collection<User>('/users');
        this.userCollectionSubscription = this.userCollection.valueChanges().subscribe(users => {
          this.users.next(users);
        });
      }
      if (!session.loggedIn && this.userCollectionSubscription != null) {
        this.userCollectionSubscription.unsubscribe();
      }
    });
  }

  /**
   * Checks if user has suoperadmin rights
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  hasUserRoleSuperadmin(userId: string): Promise<boolean> {
    return this.hasUserRole(userId, 'superadmin');
  }

  /**
   * Checks if user has hospital admin rights
   * @param {string} userId
   * @returns {Promise<boolean>}
   */
  hasUserRoleHospitalAdmin(userId: string): Promise<boolean> {
    return this.afs.firestore.doc('/hospitals/' + this.session.hospitalId).get().then(hospitalDocSnapshot => {
      const adminRole = hospitalDocSnapshot.id;
      return this.hasUserRole(userId, adminRole);
    }).catch(reason => {
      console.error('An error occurred while fetching the hospital admin role. Reason: ' + reason);
      return false;
    });
  }

  /**
   * Assign superadmin role to user
   * @param {string} userId
   */
  addRoleSuperadminToUser(userId: string) {
    this.addRoleToUser(userId, 'superadmin');
  }

  /**
   * Assigne hopspital admin role to user
   * @param {string} userId
   */
  addRoleHospitalAdminToUser(userId: string) {
    this.addRoleToUser(userId, this.session.hospitalId);
  }

  /**
   * Remove superadmin role from user
   * @param {string} userId
   */
  removeSuperadminRoleFromUser(userId: string) {
    this.removeRoleFromUser(userId, 'superadmin');
  }

  /**
   * Remove hospital admin role from user
   * @param {string} userId
   */
  removeHospitalAdminRoleFromUser(userId: string) {
    this.removeRoleFromUser(userId, this.session.hospitalId);
  }

  /**
   * Checks user role
   * @param {string} userId
   * @param {string} role
   * @returns {Promise<boolean>}
   */
  private hasUserRole(userId: string, role: string): Promise<boolean> {
    return this.afs.firestore.doc('/users/' + userId + '/roles/' + role).get().then(roleDocSnapshot => {
      console.log('User with id ' + userId + ' has role ' + role + ': ' + roleDocSnapshot.exists);
      return Promise.resolve(roleDocSnapshot.exists);
    });
  }

  /**
   * Assign roles to user
   * @param {string} userId
   * @param {string} role
   */
  private addRoleToUser(userId: string, role: string) {
    this.afs.doc('/users/' + userId + '/roles/' + role).set({}).then(result => {
      console.log('Added role ' + role + ' to user ' + userId + '. Result: ', +result);
    }).catch(reason => {
      console.error('An error occurred while adding the role ' + role + ' to the user ' + userId + '. Reason: ' + reason);
    });
  }

  /**
   * Remove roles from user
   * @param {string} userId
   * @param {string} role
   */
  private removeRoleFromUser(userId: string, role: string) {
    this.afs.doc('/users/' + userId + '/roles/' + role).delete().then(() => {
      console.log('Successfully removed role ' + role + ' from user ' + userId + '.');
    }).catch(reason => {
      console.error('An error occurred while removing the role ' + role + ' from the user ' + userId + '. Reason: ' + reason);
    });
  }

}
