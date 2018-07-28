import { Component } from '@angular/core';
import {
  AlertController, IonicPage, MenuController, ModalController, NavController,
  ToastController
} from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Hospital } from '../../entities/hospital';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionServiceProvider } from '../../providers/session-service/session-service';
import { AntibioticsOverviewPage } from '../antibiotics-overview/antibiotics-overview';
import { PasswordValidation } from '../../validators/PasswordValidation';
import { AboutPage } from '../about/about';

/**
 * The initial user setup/login UI
 */
@IonicPage()
@Component({
  selector: 'page-wizard',
  templateUrl: 'wizard.html',
})
export class WizardPage {
  private hospitals: Observable<Hospital[]>;
  private selectedHospital: string;
  private proceed: boolean = false;
  private loginForm: FormGroup;
  private registrationForm: FormGroup;
  private isLoginExpanded: boolean = true;
  private isRegisterExpanded: boolean = false;

  constructor(public navCtrl: NavController, private afs: AngularFirestore,
              private formBuilder: FormBuilder, private modalCtrl: ModalController,
              private session: SessionServiceProvider, private toastCtrl: ToastController,public alertCtrl: AlertController, private menuCtrl:MenuController) {

    this.hospitals = this.afs.collection<Hospital>(`/hospitals`, query => {
      return query.where('deleted', "==", false);
    }).valueChanges();

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.registrationForm = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      },
      {
        validator: PasswordValidation.MatchPassword
      });
  }

  /**
   * Toast 'Login successful' or 'Login failed' accordingly.
   */
  login() {
    this.session.login(this.loginForm.value.email, this.loginForm.value.password).then((user => {
      this.toastCtrl.create({message: `Login successful`, duration: 3000}).present();
      this.dismiss(user.uid);
    })).catch((error) => {
      console.error(`Login failed: `, error);
      this.toastCtrl.create({message: `Login failed`, duration: 3000}).present();
    })
  }

  /**
   * Toast 'Registration successful' or 'Registration failed' accordingly.
   */
  register() {
    this.session.register(this.registrationForm.value.email, this.registrationForm.value.password).then(user => {
      this.toastCtrl.create({message: `Registration successful`, duration: 3000}).present();
      this.dismiss(user.uid);
    }).catch((error) => {
      this.toastCtrl.create({message: `Registration failed: ${error}`, duration: 5000}).present();
    });
  }

  /**
   * To show the correct database to users according to user UID.
   * @param uid  uid refers to user UID which special for every user.
   */
  dismiss(uid: string) {
    this.session.saveSetting('hospital', {hospitalId: this.selectedHospital},
      uid).then(() => {
      this.navCtrl.setRoot(AntibioticsOverviewPage);
      setTimeout(()=>{this.session.displaySyncUpdate()}, 3000);
      setTimeout(()=>{this.toggleMenu()},100);
    }).catch((err) => {
      console.error(`Error during dismiss: ${err}`);
    })
  }

  /**
   * To open and close login view
   */
  toggleLoginView() {
    this.isLoginExpanded = !this.isLoginExpanded;
    if (this.isLoginExpanded) {
      this.isRegisterExpanded = false;
    }
  }

  /**
   * To open and close register view
   */
  toggleRegisterView() {
    this.isRegisterExpanded = !this.isRegisterExpanded;
    if (this.isRegisterExpanded) {
      this.isLoginExpanded = false;
    }
  }

  /**
   * View login and registration form.
   */
  Next() {
    this.proceed = true;
  }

  /**
   * Go back to setup page which allow users to select hospital.
   */
  Back() {
    this.proceed = false;
  }

  showAbout() {
    let modal = this.modalCtrl.create(AboutPage);
    modal.present();
  }

  /**
   * Reset password
   */
  resetPassword(){
    this.session.resetPassword(this.loginForm.value.email);
  }

  /**
   * Show confirmation for Resetting Password
   */
  resetPasswordConfirmation() {
    if (this.loginForm.value.email.length <4) {
      this.toastCtrl.create({message: `Please enter a valid email address`, duration: 3000}).present();
    } else {
      let confirm = this.alertCtrl.create({
        title: 'Confirmation Alert',
        message: 'Are you sure you want to reset password ?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel Password clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              this.resetPassword();
            }
          }
        ]
      });
      confirm.present();
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
