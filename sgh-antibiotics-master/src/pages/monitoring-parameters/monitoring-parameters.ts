import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AdministrationInfo } from '../../entities/administration-info';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { EditTextSettings } from '../../components/edit-text/edit-text';
import { deepCopy } from 'ionic-angular/util/util';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * The monitoring parameters UI
 */
@IonicPage()
@Component({
  selector: 'page-monitoring-parameters',
  templateUrl: 'monitoring-parameters.html',
})
export class MonitoringParameters {

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
   * Save and update monitoringParameters changed.
   * @param {string} text  User input.
   */
  monitoringParametersChanged(text: string) {
    if (this.administrationInfo != null && this.antibioticId != null) {
      this.administrationInfo.monitoringParameters = text;
      this.antibioticProvider.updateAdministrationInfo(deepCopy(this.administrationInfo), this.antibioticId);
    }
  }

}
