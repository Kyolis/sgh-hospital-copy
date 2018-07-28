import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Dosage, DosageType } from '../../entities/dosage';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { AdministrationInfo } from '../../entities/administration-info';
import { deepCopy } from 'ionic-angular/util/util';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Provides management (CRUD-operations) of dosages.
 */
@Component({
  selector: 'manage-dosage',
  templateUrl: 'manage-dosage.html'
})
export class ManageDosageComponent {

  dosage: Dosage;
  antibioticId: string;
  administrationInfo: AdministrationInfo;
  isEditDosage = false;

  dosageType = DosageType;

  session: Session;

  constructor(public navParams: NavParams, public viewCtrl: ViewController,
              private sessionService: SessionServiceProvider, private antibioticProvider: AntibioticProvider) {
    this.session = new Session();

    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });
    this.administrationInfo = deepCopy(navParams.get('administrationInfo'));
    this.antibioticId = navParams.get('antibioticId');
    this.initDosage(navParams.get('dosageIndex'));
  }

  /**
   * Closes the modal.
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * Save and update administration info to database.
   */
  save() {
    this.dosage.type = +this.dosage.type;
    if (this.dosage.type == DosageType.GREATER || this.dosage.type == DosageType.LESSER_OR_EQUAL) {
      delete this.dosage.clcrLow;
      delete this.dosage.clcrHigh;
    } else if (this.dosage.type == DosageType.FROM_TO) {
      delete this.dosage.clcr;
    }
    if (!this.isEditDosage) {
      this.administrationInfo.dosages.push(JSON.parse(JSON.stringify(this.dosage)));
    }
    this.antibioticProvider.updateAdministrationInfo(this.administrationInfo, this.antibioticId);
    this.dismiss();
  }

  /**
   * Create dosage if it doesn't exist yet.
   * @param {number} dosageIndex
   */
  private initDosage(dosageIndex: number) {
    if (this.administrationInfo.dosages != null) {
      this.dosage = this.administrationInfo.dosages[dosageIndex];
    } else {
      this.administrationInfo.dosages = [];
    }
    this.isEditDosage = this.dosage != null;
    if (!this.isEditDosage) {
      let dosage = new Dosage();
      dosage.type = DosageType.GREATER;
      this.dosage = dosage;
    }
  }

}
