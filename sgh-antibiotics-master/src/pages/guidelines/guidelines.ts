import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';

import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { Guideline } from '../../entities/guideline';
import { GuidelinesDetailsPage } from '../guidelines-details/guidelines-details';
import { GuidelineProvider } from '../../providers/guideline/guideline';

/**
 * The guidelines UI
 */
@IonicPage()
@Component({
  selector: 'page-guidelines',
  templateUrl: 'guidelines.html',
})
export class GuidelinesPage {
  guidelines: Guideline[];
  session: Session;

  constructor(public navCtrl: NavController,
              private sessionService: SessionServiceProvider,
              private guidelineProvider: GuidelineProvider,
              private alertCtrl: AlertController) {
    this.session = new Session();

    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });

    this.guidelineProvider.guidelines.subscribe(guidelines => {
      this.guidelines = guidelines;
    });
  }

  /**
   * View individual guideline details.
   * @param {Guideline} guideline  Name and Text.
   */
  showGuideline(guideline: Guideline) {
    this.navCtrl.push(GuidelinesDetailsPage, {guideline});
  }

  /**
   * Alert for editing guideline name.
   * @param {Guideline} guideline  Name and Text.
   */
  showEditGuidelineAlert(guideline: Guideline) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Renaming');
    alert.setMessage('Choose a new name for ' + guideline.name);
    alert.addInput({
      name: 'newName',
      placeholder: 'New guideline name'
    });
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      cssClass: 'alertDanger',
      handler: () => {}
    });
    alert.addButton({
      text: 'Save',
      handler: (data) => {
        guideline.name = data.newName;
        this.guidelineProvider.updateGuideline(guideline);
      }
    });
    alert.present();
  }

  /**
   * Alert for deleting guideline.
   * @param {Guideline} guideline  Name and Text.
   */
  showDeleteGuidelineAlert(guideline: Guideline) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Deleting ' + guideline.name + ' guideline');
    alert.setMessage('Are you sure you want to delete the guideline ' + guideline.name + ' ?');
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      handler: () => {}
    });
    alert.addButton({
      text: 'Delete',
      cssClass: 'alertDanger',
      handler: () => {
        this.guidelineProvider.deleteGuideline(guideline);
      }
    });
    alert.present();
  }

  /**
   * Alert for adding guideline.
   */
  showAddGuidelineAlert(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Adding Guideline');
    alert.addInput({
      name: 'newGuidelineName',
      placeholder: 'Guideline name'
    });
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      cssClass: 'alertDanger',
      handler: () => {}
    });
    alert.addButton({
      text: 'Add',
      handler: (data) => {
        let newGuideline = {} as Guideline;
        newGuideline.name = data.newGuidelineName;
        newGuideline.text = "";
        this.guidelineProvider.addNewGuideline(newGuideline);
      }
    });
    alert.present();
  }
}
