import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AdministrationInfo } from '../../entities/administration-info';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { EditTextSettings } from '../../components/edit-text/edit-text';
import { deepCopy } from 'ionic-angular/util/util';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Adverse Reactions UI
 */
@IonicPage()
@Component({
  selector: 'page-adverse-reactions',
  templateUrl: 'adverse-reactions.html',
})
export class AdverseReactionsPage {

  editTextSettings: EditTextSettings = {
    showInfo: true,
    showShortcuts: true,
    showResetButton: false,
    showSaveButton: false,
    debounceTime: 500
  };

  administrationInfo: AdministrationInfo;
  antibioticId: string;
  session: Session;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public sessionService: SessionServiceProvider, public antibioticProvider: AntibioticProvider) {
    this.administrationInfo = this.navParams.get('administrationInfo');
    this.antibioticId = this.navParams.get('antibioticId');
    this.session = new Session();

    /**
     * Get session state.
     */
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });
  }

  /**
   * To close the modal.
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * Save and update the changes made in adverse reaction.
   * @param {string} text  Adverse reaction content.
   */
  adverseReactionsChanged(text: string) {
    if (this.administrationInfo != null && this.antibioticId != null) {
      this.administrationInfo.adverseReactions = text;
      this.antibioticProvider.updateAdministrationInfo(deepCopy(this.administrationInfo), this.antibioticId);
    }
  }

}
