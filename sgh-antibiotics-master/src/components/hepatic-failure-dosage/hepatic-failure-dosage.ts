import { Component, Input } from '@angular/core';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { deepCopy } from 'ionic-angular/util/util';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { AdministrationInfo } from '../../entities/administration-info';
import { HepaticFailureDosage, HepaticFailureDosageType } from '../../entities/hepatic-failure-dosage';
import { ManageHepaticFailureDosageComponent } from '../manage-hepatic-failure-dosage/manage-hepatic-failure-dosage';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Show and manage Hepatic Failure Dosages.
 */
@Component({
  selector: 'hepatic-failure-dosage',
  templateUrl: 'hepatic-failure-dosage.html'
})
export class HepaticFailureDosageComponent {

  @Input() _administrationInfo: AdministrationInfo;

  hepaticFailureDosages: HepaticFailureDosage[];
  @Input() editMode: boolean;
  @Input() antibioticId: string;

  index: number;

  // workaround to use enums
  public hepaticFailureDosageType = HepaticFailureDosageType;

  session: Session;

  constructor(public navCtrl: NavController, private sessionService: SessionServiceProvider,
              private modalCtrl: ModalController, public alertCtrl: AlertController, private antibioticProvider: AntibioticProvider) {
    this.session = new Session();

    /**
     * Get session status.
     */
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });
  }

  /**
   * Constantly getting administration info.
   * @returns {AdministrationInfo}  Administration Info.
   */
  get administrationInfo(): AdministrationInfo {
    return this._administrationInfo;
  }

  /**
   * Setting administration info.
   * @param {AdministrationInfo} value  Administration Info.
   */
  @Input()
  set administrationInfo(value: AdministrationInfo) {
    if (value.hepaticFailureDosages != null) {
      this.sortDosages(value.hepaticFailureDosages);
    }
    this.hepaticFailureDosages = value.hepaticFailureDosages;
    this._administrationInfo = value;
  }

  /**
   * Create modal for adding dosage.
   * @param {HepaticFailureDosage} dosage
   */
  showAddDosageAlert(dosage: HepaticFailureDosage) {
    if (this.administrationInfo.hepaticFailureDosages == null) {
      this.administrationInfo.hepaticFailureDosages = [];
    }
    let modal = this.modalCtrl.create(ManageHepaticFailureDosageComponent,
      {administrationInfo: this.administrationInfo,
        dosageIndex: this.administrationInfo.hepaticFailureDosages.indexOf(dosage), antibioticId: this.antibioticId});
    modal.present();
  }

  /**
   * Alert for deleting dosage.
   * @param {number} dosageIndex
   */
  showDeleteDosageAlert(dosageIndex: number) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Deleting dosage');
    alert.setMessage('Are you sure you want to delete the dosage ?');
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      handler: () => {}
    });
    alert.addButton({
      text: 'Delete',
      cssClass: 'alertDanger',
      handler: () => {
        this.deleteDosage(dosageIndex);
      }
    });
    alert.present();
  }

  /**
   * Delete dosage from database.
   * @param {number} dosageIndex
   */
  deleteDosage(dosageIndex: number) {
    let updatedAdministrationInfo = deepCopy(this.administrationInfo);
    updatedAdministrationInfo.hepaticFailureDosages.splice(dosageIndex, 1);
    this.antibioticProvider.updateAdministrationInfo(updatedAdministrationInfo, this.antibioticId);
  }

  /**
   * first sorts by type A > B > C
   * @param {HepaticFailureDosage[]} dosages
   */
  private sortDosages(dosages: HepaticFailureDosage[]) {
    dosages.sort((d1, d2) => {
      if (d1.type < d2.type) return -1;
      if (d1.type > d2.type) return 1;
      return 0;
    });
  }

}
