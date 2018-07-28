import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from '../../validators/PasswordValidation';
import { Observable } from 'rxjs/Observable';
import { Hospital } from '../../entities/hospital';
import { HospitalDetailsPage } from '../hospital-details/hospital-details';
import { HospitalProvider } from '../../providers/hospital/hospital';

/**
 * Generated class for the UserSettings page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-settings',
  templateUrl: 'user-settings.html',
})
export class UserSettingsPage {
  private session: Session;
  private hospitals: Observable<Hospital[]>;
  private hospitalSelectionForm: FormGroup;
  private passwordChangeForm: FormGroup;
  private settingsForm: FormGroup;
  public showChangePasswordForm = false;

  private hospitalId: Observable<string>;
  private selectedDb: Observable<string>;

  private _editModeEnabled: boolean;

  constructor(public toastCtrl: ToastController,
              private sessionService: SessionServiceProvider,
              private formBuilder: FormBuilder,
              private hospitalService: HospitalProvider,
              private navCtrl: NavController,
              private alertCtrl: AlertController) {

    this.session = new Session();

    this.sessionService.state.subscribe((session) => {
      this.session = session;
      this.editModeEnabled = session.isEditView;
    });

    this.passwordChangeForm = this.formBuilder.group({
      currentPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, {validator: PasswordValidation.MatchPassword});

    this.hospitals = this.hospitalService.hospitals;

    this.hospitalSelectionForm = this.formBuilder.group({
      hospitalId: new FormControl(this.session.hospitalId, [Validators.required])
    });

    this.hospitalId = this.hospitalSelectionForm.get('hospitalId').valueChanges;

    this.hospitalId.subscribe(hospitalId => {
      this.sessionService.saveSetting('hospital', {hospitalId}, this.session.user.uid).then(() => {
        this.toastCtrl.create({message: `Hospital changed`, duration: 3000}).present();
      })
        .catch((error) => {
          this.toastCtrl.create({message: `Hospital change failed: ${error}`, duration: 3000}).present();
        });
    });

    /**
     * Setting form which allow user to change the between 'staging' or 'live' database.
     * @type {FormGroup}
     */
    this.settingsForm = this.formBuilder.group({
      selectedDb: new FormControl(this.session.selectedDb)
    });

    /**
     * Set this.selectDb to the selected database.
     */
    this.selectedDb = this.settingsForm.get('selectedDb').valueChanges;

    /**
     * Set edit mode view to disable if 'live' database is selected.
     * Save the selected database to the session.
     */
    this.selectedDb.subscribe(selected_db => {
      if (selected_db === 'live') {
        this.sessionService.enableEditView(false);
      }
      this.sessionService.setSelectedDatabase(selected_db as ('staging' | 'live'));
    })
  }

  /**
   * To enable and disable edit mode.
   * Set edit mode to true or false.
   * @param {boolean} value  true(enable) or false(disable).
   */
  set editModeEnabled(value: boolean) {
    this.sessionService.enableEditView(value);
    this._editModeEnabled = value;
  }

  /**
   * Constantly getting edit mode state(true/false).
   * @returns {boolean}  Edit mode enabled (true) or edit mode disable (false).
   */
  get editModeEnabled(): boolean {
    return this._editModeEnabled;
  }

  /**
   * To logout.
   * Toast `Logout successful`.
   */
  logout() {
    this.sessionService.logout().then(() => {
      this.toastCtrl.create({message: `Logout successful`, duration: 3000}).present();
    });
  }

  /**
   * To change password.
   * Toast 'Password changed successfully' and 'Error'.
   */
  changePassword() {
    if (this.passwordChangeForm.valid) {
      const currentPassword = this.passwordChangeForm.get('currentPassword').value;
      const password = this.passwordChangeForm.get('password').value;
      this.sessionService.changePassword(currentPassword, password)
        .then(() => {
          this.toastCtrl.create({message: `Password changed successfully`, duration: 3000}).present();
          this.showChangePasswordForm = false;
          this.passwordChangeForm.reset();
        })
        .catch((error) => {
          this.toastCtrl.create({message: `Error: ${error}`, duration: 5000}).present();
        });
    }
  }

  deleteAccount() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Delete Account');
    alert.setMessage('Are you sure you want to delete your account?');
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      handler: () => {}
    });
    alert.addButton({
      text: 'Delete',
      cssClass: 'alertDanger',
      handler: () => {
        this.sessionService.deleteAccount();
      }
    });
    alert.present();
  }

  /**
   * View hospital details.
   */
  openHospitalDetails() {
    console.log(`mh`);
    this.navCtrl.push(HospitalDetailsPage, {
      hospitalId: this.session.hospitalId
    });
  }
}
