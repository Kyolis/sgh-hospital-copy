import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * The user detail UI
 */
@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage implements OnInit {

  @Input('user')
  public user: User;
  private session: Session;

  private _isUserSuperadmin: boolean;
  private _isUserHospitalAdmin: boolean;
  private isViewingSelf: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionService: SessionServiceProvider,
              private userService: UserServiceProvider) {
  }

  ngOnInit(): void {
    const user = this.navParams.get('user');
    if (user) {
      this.user = user;
    }
    this.session = new Session();

    /**
     * Get session state.
     * Determine role of user(superadmin or hospitalAdmin or noraml user).
     */
    this.sessionService.state.subscribe((session) => {
      this.session = session;
      if (session.loggedIn && session.hospitalId) {
        this.isViewingSelf = session.user.uid === this.user.uid;
        this.userService.hasUserRoleSuperadmin(this.user.uid).then((isSuperadmin) => {
            this.isUserSuperadmin = isSuperadmin;
          }
        );
        this.userService.hasUserRoleHospitalAdmin(this.user.uid).then((isHospitalAdmin) => {
          this.isUserHospitalAdmin = isHospitalAdmin;
        })
      }
    });
  }

  /**
   * Constantly getting role of superadmin.
   * @returns {boolean}  True(superadmin) or false(not superadmin).
   */
  get isUserSuperadmin(): boolean {
    return this._isUserSuperadmin;
  }

  /**
   * Role setting for superadmin.
   * @param {boolean} value  True(superadmin) or false(not superadmin).
   */
  set isUserSuperadmin(value: boolean) {
    if (value !== this._isUserSuperadmin) {
      if (value) this.userService.addRoleSuperadminToUser(this.user.uid);
      else this.userService.removeSuperadminRoleFromUser(this.user.uid);
    }
    this._isUserSuperadmin = value;
  }

  /**
   * Constantly getting role of hospital admin.
   * @returns {boolean}  True(hospital admin) or false(not hospital admin).
   */
  get isUserHospitalAdmin(): boolean {
    return this._isUserHospitalAdmin;
  }

  /**
   * Role setting for hospital admin.
   * @param {boolean} value  True(hospital admin) or false(not hospital admin).
   */
  set isUserHospitalAdmin(value: boolean) {
    if (value !== this._isUserHospitalAdmin) {
      if (value) this.userService.addRoleHospitalAdminToUser(this.user.uid);
      else this.userService.removeHospitalAdminRoleFromUser(this.user.uid);
    }
    this._isUserHospitalAdmin = value;
  }

}

