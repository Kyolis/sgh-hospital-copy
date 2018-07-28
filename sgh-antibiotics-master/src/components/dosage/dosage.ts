import { Component, Input } from '@angular/core';
import { Dosage, DosageType } from '../../entities/dosage';
import { CalculatorPage } from '../../pages/calculator/calculator';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { ManageDosageComponent } from '../manage-dosage/manage-dosage';
import { AdministrationInfo } from '../../entities/administration-info';
import { deepCopy } from 'ionic-angular/util/util';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Show and manage Dosages.
 */
@Component({
  selector: 'dosage',
  templateUrl: 'dosage.html'
})
export class DosageComponent {

  @Input() _administrationInfo: AdministrationInfo;

  dosages: Dosage[];
  @Input() editMode: boolean;
  @Input() antibioticId: string;

  searchInput: number;
  index: number;

  // workaround to use enums
  public dosageType = DosageType;

  session: Session;

  constructor(public navCtrl: NavController,
              private sessionService: SessionServiceProvider,
              private modalCtrl: ModalController, public alertCtrl: AlertController,
              private antibioticProvider: AntibioticProvider) {
    this.session = new Session();

    /**
     * Get session state.
     */
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });
  }

  /**
   * Retrieve the current info of this component.
   * @returns {AdministrationInfo}  current info.
   */
  get administrationInfo(): AdministrationInfo {
    return this._administrationInfo;
  }

  /**
   * Setting new info for this component.
   * @param {AdministrationInfo} value  new info.
   */
  @Input()
  set administrationInfo(value: AdministrationInfo) {
    if (value.dosages != null) {
      this.sortDosages(value.dosages);
    }
    this.dosages = value.dosages;
    this._administrationInfo = value;
  }

  /**
   * View calculator page with Cockroft-Gault Equation expanded.
   */
  showCalculator() {
    let modal = this.modalCtrl.create(CalculatorPage, {openCockroftOnly: true});
    modal.present();
    modal.onDidDismiss(data => {
      let cockcroft = data['cockcroft'];
      if (cockcroft) {
        cockcroft = +cockcroft;
        cockcroft = Math.floor(cockcroft + 0.5);
        this.searchInput = cockcroft;
      }
    })
  }

  /**
   * Create modal for adding dosage.
   * @param {Dosage} dosage
   */
  showAddDosageAlert(dosage: Dosage) {
    if (this.administrationInfo.dosages == null) {
      this.administrationInfo.dosages = [];
    }
    let modal = this.modalCtrl.create(ManageDosageComponent,
      {
        administrationInfo: this.administrationInfo,
        dosageIndex: this.administrationInfo.dosages.indexOf(dosage),
        antibioticId: this.antibioticId
      });
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
      handler: () => {
      }
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
    updatedAdministrationInfo.dosages.splice(dosageIndex, 1);
    this.antibioticProvider.updateAdministrationInfo(updatedAdministrationInfo, this.antibioticId);
  }

  /**
   * first sorts by type GREATER > FROM_TO > LESSER_OR_EQUAL
   * then by values if the type is the same
   * for FROM_TO it's sorted by the clcrHigh value
   * @param {Dosage[]} dosages
   */
  private sortDosages(dosages: Dosage[]) {
      dosages.sort((d1, d2) => {
      if (d1.type < d2.type) return -1;
      if (d1.type > d2.type) return 1;
      if (d1.type == d2.type) {
        if (d1.type == DosageType.GREATER || d1.type == DosageType.LESSER_OR_EQUAL) {
          if (d1.clcr > d2.clcr) return -1;
          if (d1.clcr < d2.clcr) return 1;
        }
        if (d1.type == DosageType.FROM_TO) {
          if (d1.clcrHigh > d2.clcrHigh) return -1;
          if (d1.clcrHigh < d2.clcrHigh) return 1;
        }
      }
      return 0;
    });
  }
}
