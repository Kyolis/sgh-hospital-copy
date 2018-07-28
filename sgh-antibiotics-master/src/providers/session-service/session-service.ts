import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { default as firebase, User } from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Hospital } from '../../entities/hospital';
import { Subscription } from 'rxjs/Subscription';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { take } from 'rxjs/operators';

export class Session {
  loggedIn = false;
  roles: string[] = [];
  isAdmin: boolean = false;
  isSuperadmin: boolean = false;
  user?: User;
  hospitalId = '';
  isEditView = false;
  selectedDb: 'staging' | 'live' = 'live';

  constructor() {
    this.loggedIn = false;
    this.roles = [];
    this.isAdmin = false;
    this.user = null;
    this.hospitalId = '';
    this.selectedDb = 'live';
    this.isEditView = false;
  }
}

/**
 * Provides the Client-Side Session state throughout the whole App. Emits new Session Objects if there are transitions
 * that affect the state of the App.
 */
@Injectable()
export class SessionServiceProvider {
  private session: Session;
  public state = new ReplaySubject<Session>(1);
  private rolesSubscription: Subscription;
  private hospitalSettingSubscription: Subscription;
  private hospitalsSubscription: Subscription;
  connected : Subscription;
  disconnected : Subscription;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private toastCtrl: ToastController, private network: Network) {
    this.session = new Session();
    // Set user settings
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.session.user = user;
        this.session.loggedIn = true;
        this.subscribeToUserRoles(user);
        this.subscribeToHospitalSetting(user);
      } else {
        this.session = new Session();
        this.unsubscribeAllSubscriptions();
        this.state.next(this.session);
      }
    }, (error) => SessionServiceProvider.printError('authState: ' + error))
  }

  /**
   * Login a user using email and password
   * @param {string} email the email of the user account
   * @param {string} password password of the user account
   * @returns {Promise<User>}
   */
  login(email: string, password: string): Promise<User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Logged in: ', res);
      return res as User;
    })
  }

  /**
   * Ends the current session for the user and redirects to the Setup Wizard to show the login and hospital selection prompt.
   * @returns {Promise<any>}
   */
  logout() {
    this.unsubscribeAllSubscriptions();
    return this.afAuth.auth.signOut();
  }

  /**
   * Creates a new Account with the given credentials.
   * @param {string} email the email address to use
   * @param {string} password the new password for the account
   * @returns {Promise<User>} A Firebase User when promise is resolved or an error message when rejected.
   */
  register(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(user => {
      return user as User;
    });
  }

  /**
   * Deletes the account of the currently logged in user.
   * @returns {Promise<any>}
   */
  deleteAccount() {
    return this.afAuth.auth.currentUser.delete();
  }

  /**
   * Sets a setting on the settings-collection of the user. Overrides existing values and creates new documents,
   * if they aren't existing.
   * @param {string} oldPassword The current password of the logged-in user.
   * @param {string} newPassword The new password.
   * @returns {Promise<void>} On rejection an error message is returned.
   */
  changePassword(oldPassword: string, newPassword: string): Promise<void> {
    const credentials = firebase.auth.EmailAuthProvider.credential(this.session.user.email, oldPassword);
    return this.afAuth.auth.currentUser.reauthenticateWithCredential(credentials).then(() => {
      console.log(`User re-authenticated.`);
      this.afAuth.auth.currentUser.updatePassword(newPassword).then(() => {
        console.log(`Password changed.`);
        return Promise.resolve();
      })
        .catch((error) => {
          console.error(`Error changing password: ${error}`);
          return Promise.reject('Error changing password');
        });
    }).catch((error) => {
      console.error(`Error re-authenticating user: ${error}`);
      return Promise.reject(`Current password is wrong`);
    });
  }

  /**
   * Sets a setting on the settings-collection of the user. Overrides existing values and creates new documents,
   * if they aren't existing.
   * @param {string} name Name of the setting
   * @param {object} settingsObj The object which contains the settings data
   * @param {string} uid User ID of the account to store the settings for.
   * @returns {Promise<void>} On rejection an error message is returned.
   */
  saveSetting(name: string, settingsObj: object, uid: string): Promise<void> {
    return this.afs.doc(`/users/${uid}/settings/${name}`).set(settingsObj)
      .then(() => {
        console.log(`User settings saved successfully`);
        this.checkHospitalAndPrivileges();
        return Promise.resolve();
      })
      .catch((error) => {
        console.error(`User settings save failed: ${error}`);
        return Promise.reject('Error saving hospitalId');
      });
  }

  /**
   * Enables or disables the edit view mode.
   *
   * @param {boolean} enable
   */
  enableEditView(enable: boolean) {
    if (enable) {
      if (this.session.isAdmin) {
        if (this.session.selectedDb === 'staging') {
          this.session.isEditView = enable;
        } else {
          console.error('The edit view mode is only available while the staging database is selected.')
        }
      } else {
        console.error('Insufficient permissions: Only admins can enable the edit view mode.')
      }
    } else {
      this.session.isEditView = enable;
    }
  }

  /**
   * Changes the selected database.
   * Also disables the editMode when 'live' db is selected.
   *
   * @param {string} selectedDb database.
   */
  setSelectedDatabase(selectedDb: 'staging' | 'live') {
    this.session.selectedDb = selectedDb;
    if (this.session.selectedDb === 'live') {
      this.session.isEditView = false;
    }
    this.state.next(this.session);
  }

  /**
   * Checks if the user has admin rights for the currently selected hospital.
   */
  private checkHospitalAndPrivileges() {
    if (this.session.roles.indexOf('superadmin') > -1) {
      this.session.isAdmin = true;
      this.session.isSuperadmin = true;
      this.state.next(this.session);
    } else if (this.session.hospitalId == null || this.session.hospitalId.length < 1) {
      this.session.isAdmin = false;
      this.state.next(this.session);
    }

    if (this.session.hospitalId) {

      this.hospitalsSubscription = this.afs.doc<Hospital>(`/hospitals/${this.session.hospitalId}`).snapshotChanges()
        .subscribe(snapshot => {
          const hospital = snapshot.payload.data();
          console.log(`hospital changed:`, hospital);
          if (!hospital) {
            this.session.isAdmin = this.session.isSuperadmin;
          }
          else if (hospital.deleted && !snapshot.payload.metadata.hasPendingWrites) {
            this.logout().then(() => {
              this.toastCtrl.create({
                message: `You were logged out because your hospital was deleted.`,
                duration: 5000
              }).present();
            });
          }
          else if (this.session.roles.indexOf(this.session.hospitalId) > -1) {
            this.session.isAdmin = true;
          }

          this.state.next(this.session);
        });
    }
  }

  /**
   * Print error message
   * @param {string} error
   */
  private static printError(error: string) {
    console.error('handleError: ', error);
  }

  /**
   * Subscribe to Hospital settings
   * @param user
   */
  private subscribeToHospitalSetting(user) {
    this.hospitalSettingSubscription = this.afs.doc<{ hospitalId }>(`/users/${user.uid}/settings/hospital`).valueChanges().subscribe(hospital => {
      if (hospital) {
        this.session.hospitalId = hospital.hospitalId;
        this.checkHospitalAndPrivileges()
      }
      this.state.next(this.session);
    }, (error) => SessionServiceProvider.printError(`settings/hospital: ${error}`));
  }

  /**
   * Subscribe to user role
   * @param user
   */
  private subscribeToUserRoles(user) {
    this.rolesSubscription = this.afs.collection<{ name }>(`/users/${user.uid}/roles`).snapshotChanges().subscribe(actions => {
      this.session.roles = actions.map(action => {
        return action.payload.doc.id;
      });
      this.checkHospitalAndPrivileges()
    }, (error) => SessionServiceProvider.printError(`roles: ${error}`));
  }

  /**
   * Unsubscribe all subscription
   */
  private unsubscribeAllSubscriptions() {
    if (this.rolesSubscription)
      this.rolesSubscription.unsubscribe();
    if (this.hospitalSettingSubscription)
      this.hospitalSettingSubscription.unsubscribe();
    if (this.hospitalsSubscription)
      this.hospitalsSubscription.unsubscribe();
  }

  /**
   * Reset password
   * @param emailAddress
   */
  resetPassword(emailAddress: string){
    this.afAuth.auth.sendPasswordResetEmail(emailAddress).then(()=>{
      this.toastCtrl.create({message: `Reset mail is successfully sent to: ${emailAddress} `, duration: 3000}).present();
    }).catch((error) => {
      this.toastCtrl.create({message: `No such user, please enter a valid email address.`, duration: 5000}).present();
    });
  }

  /**
   * Display Toast when user does an online sync check.
   */
  displaySyncUpdate(){
    //Display toast for sync-in progress
    setTimeout(()=>{this.toastCtrl.create({message: `Hospital database synchronization in progress`, duration: 5000}).present();}, 2000);

    //Verify if DB has been synced
    setTimeout(()=>{this.onlineStatusSynced();}, 4500);
  }

  /**
   * Display Toast when user connects/disconnects to wifi
   * @param connectionState
   */
  displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toastCtrl.create({message: `You are now ${connectionState} via ${networkType}`, duration: 2000}).present();
  }

  /**
   * Load status subscription
   */
  loadStatus(){
    this.connected = this.network.onConnect().pipe(take(1)).subscribe(data => {
      console.log(data);
      this.displayNetworkUpdate(data.type);
      this.displaySyncUpdate(); //display sync update
      },error=> console.error(error)
    );

    this.disconnected = this.network.onDisconnect().pipe(take(1)).subscribe(data => {
      console.log(data);
      this.displayNetworkUpdate(data.type);
      },error=> console.error(error)
    );
  }

  /**
   * Verify if DB has been synced
   */
  onlineStatusSynced() {
    let db;
    let config = {
      apiKey: "AIzaSyBQlyYQXBhklcvKC58XU4J2lU8Zm1q7uDE",
      authDomain: "sgh-antibiotics.firebaseapp.com",
      projectId: "sgh-antibiotics"
    };

    let i : number = Math.random();
    let app = firebase.initializeApp(config,`init${i}`);
    let source: any = '';
    db = firebase.firestore(app);

    db.collection("hospitals")
      .onSnapshot(function(snapshot) {
        /* snapshot.docChanges.forEach(function(change) {
           if (change.type === "added") {
             console.log("New Hospital: ", change.doc.data());
           }*/

        //If fromCache is true, the data came from the cache and might be stale or incomplete. If fromCache is false, the data is complete and current with the latest updates on the server.
        source = snapshot.metadata.fromCache ? "local cache" : "server";
        console.log("Data came from " + source);
      });
    //});

    setTimeout(()=>{this.isToastSynced(source);}, 5000);

  }

  /**
   * Display Toast if DB has been synced or not (if source is == server, the data is complete and current with the latest updates on the server)
   * @param source
   */
  isToastSynced(source){
    if (source == "server") {
      this.toastCtrl.create({message: `Hospital database synchronization successful`, duration: 3000}).present();
    }else{
      this.toastCtrl.create({message: `Error: database synchronization unsuccessful`, duration: 3000}).present();
      console.log(source);
    }
  }

}
