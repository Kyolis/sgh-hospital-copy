import { Component } from '@angular/core';
import { AlertController, IonicPage, NavParams } from 'ionic-angular';
import { Guideline } from '../../entities/guideline';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { GuidelineProvider } from '../../providers/guideline/guideline';

/**
 * The guidelines details UI
 */
@IonicPage()
@Component({
  selector: 'page-guidelines-details',
  templateUrl: 'guidelines-details.html',
})
export class GuidelinesDetailsPage {

  guideline: Guideline;
  editText: string = '';

  session: Session;

  constructor(public navParams: NavParams,
              private alertCtrl: AlertController,
              private guidelineProvider: GuidelineProvider,
              public sessionService: SessionServiceProvider){
    this.session = new Session();

    /**
     * Get session state.
     */
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });

    this.guideline = this.navParams.get('guideline');
  }

  /**
   * Alert before leaving the page.
   * @returns {Promise<any>}  Resolve(back to previous page) or reject(stay on the same page).
   */
  ionViewCanLeave() {
    if (this.editText !== this.guideline.text){
      return new Promise((resolve, reject) => {
        let confirm = this.alertCtrl.create({
          title: 'Are you sure you want to leave..?',
          message: 'Your changes will be lost if you do?',
          cssClass: 'alertButtonCSS',
          buttons: [
            {
              text: 'Leave',
              cssClass: 'alertDanger',
              handler: () => {
                resolve();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                reject();
              }
            },
            {
              text: 'Save',
              handler: () => {
                this.saveMarkdownChanges(this.editText);
                resolve();
              }
            }
          ]
        });
        confirm.present();
      });
    }
  }

  /**
   * Save and update guideline.
   * @param {string} text  Guideline details.
   */
  saveMarkdownChanges(text: string){
    this.guideline.text = text;
    this.guidelineProvider.updateGuideline(this.guideline);
    this.session.isEditView = false;
  }

  /**
   * Detect changes in guideline details.
   * @param {string} text  Guideline details.
   */
  textChange(text: string) {
    this.editText = text;
  }
}
