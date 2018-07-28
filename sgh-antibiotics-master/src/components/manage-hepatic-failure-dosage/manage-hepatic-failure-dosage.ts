import { Component } from '@angular/core';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { NavParams, ViewController } from 'ionic-angular';
import { deepCopy } from 'ionic-angular/util/util';
import { AdministrationInfo } from '../../entities/administration-info';
import { HepaticFailureDosage, HepaticFailureDosageType } from '../../entities/hepatic-failure-dosage';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Provides hepatic failure value management (CRUD-operations).
 */
@Component({
  selector: 'manage-hepatic-failure-dosage',
  templateUrl: 'manage-hepatic-failure-dosage.html'
})
export class ManageHepaticFailureDosageComponent {

  dosage: HepaticFailureDosage;
  antibioticId: string;
  administrationInfo: AdministrationInfo;
  isEditDosage = false;

  dosageType = HepaticFailureDosageType;

  session: Session;

  constructor(public navParams: NavParams, public viewCtrl: ViewController,
              private sessionService: SessionServiceProvider, private antibioticProvider: AntibioticProvider) {
    this.session = new Session();

    /**
     * Get session state.
     */
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });
    this.administrationInfo = deepCopy(navParams.get('administrationInfo'));
    this.antibioticId = navParams.get('antibioticId');
    this.initDosage(navParams.get('dosageIndex'));
  }

  /**
   * To close the modal.
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * Save and update administration info to database.
   */
  save() {
    if (!this.isEditDosage) {
      this.administrationInfo.hepaticFailureDosages.push(JSON.parse(JSON.stringify(this.dosage)));
    }
    this.antibioticProvider.updateAdministrationInfo(this.administrationInfo, this.antibioticId);
    this.dismiss();
  }

  /**
   * Reset dosage.
   * @param {number} dosageIndex
   */
  private initDosage(dosageIndex: number) {
    if (this.administrationInfo.hepaticFailureDosages != null) {
      console.log('SETTING DOSAGE (BY INDEX): ', dosageIndex);
      this.dosage = this.administrationInfo.hepaticFailureDosages[dosageIndex];
    } else {
      this.administrationInfo.hepaticFailureDosages = [];
    }
    console.log('DOSAGES: ', this.administrationInfo.hepaticFailureDosages);
    console.log('SET DOSAGE: ', this.dosage);
    this.isEditDosage = this.dosage != null;
    console.log('IS EDIT DOSAGE: ', this.isEditDosage);
    if (!this.isEditDosage) {
      let dosage = new HepaticFailureDosage();
      dosage.type = HepaticFailureDosageType.A;
      this.dosage = dosage;
    }
  }

}
