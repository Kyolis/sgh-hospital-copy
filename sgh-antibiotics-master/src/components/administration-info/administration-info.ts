import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { AdministrationInfo } from "../../entities/administration-info";
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { MonitoringParameters } from '../../pages/monitoring-parameters/monitoring-parameters';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { EditTextSettings } from '../edit-text/edit-text';
import { AdverseReactionsPage } from '../../pages/adverse-reactions/adverse-reactions';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';
import { AdminInfoTreatment } from '../../entities/admin-info-treatment';
import { Subscription } from 'rxjs/Subscription';
import { AdminInfoTreatmentServiceProvider } from '../../providers/admin-info-treatment-service/admin-info-treatment-service';
import { InfectionProvider } from '../../providers/infection/infection';
import { Condition } from '../../entities/condition';
import { Infection } from '../../entities/infection';
import { Treatment } from '../../entities/treatment';
import { InfectionDetailsPage } from '../../pages/infection-details/infection-details';

/**
 * Show and manage AdministrationInfos.
 */
@Component({
  selector: 'administration-info',
  templateUrl: 'administration-info.html'
})
export class AdministrationInfoComponent implements OnDestroy {

  @Input() private _administrationInfo: AdministrationInfo;
  @Input() private antibioticId: string;
  @Output() administrationInfoChange = new EventEmitter();

  session: Session;
  adminInfoTreatmentsSubscription: Subscription;

  references: {infection: Infection, condition: Condition, treatment: Treatment}[];

  editTextSettings: EditTextSettings = {
    showInfo: true,
    showShortcuts: true,
    showResetButton: false,
    showSaveButton: false,
    debounceTime: 500
  };

  constructor(public sessionService: SessionServiceProvider, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public navCtrl: NavController, private antibioticService: AntibioticProvider,
              private adminInfoTreatmentService: AdminInfoTreatmentServiceProvider,
              private infectionService: InfectionProvider) {

    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });
  }

  get administrationInfo(): AdministrationInfo {
    return this._administrationInfo;
  }

  @Input() set administrationInfo(value: AdministrationInfo) {
    this._administrationInfo = value;
    this.adminInfoTreatmentsSubscription = this.adminInfoTreatmentService.adminInfoTreatments.subscribe(adminInfoTreatments => {
      adminInfoTreatments = adminInfoTreatments.filter(adminInfoTreatment => {
        return adminInfoTreatment.administrationInfoId === this.administrationInfo._id &&
          adminInfoTreatment.antibioticId === this.antibioticId;
      });
      this.initReferences(adminInfoTreatments);
    });
  }

  /**
   * Present a modal for monitoring-parameters.
   */
  showMonitoringParameters() {
    let monitoringParametersModal = this.modalCtrl.create(MonitoringParameters,
      {administrationInfo: this.administrationInfo, antibioticId: this.antibioticId});
    monitoringParametersModal.present();
  }

  ngOnDestroy(): void {
    if (this.adminInfoTreatmentsSubscription != null) {
      this.adminInfoTreatmentsSubscription.unsubscribe();
    }
  }

  /**
   * Create modal for adverse reaction.
   */
   showAdverseReactions() {
     let adverseReactionsModal = this.modalCtrl.create(AdverseReactionsPage,
         {administrationInfo: this.administrationInfo, antibioticId: this.antibioticId});
     adverseReactionsModal.present();
   }

  /**
   * Update content for usual adult dosage.
   * @param {string} text  Content for usual adult dosage.
   */
  usualAdultDosageChanged(text: string) {
    this.administrationInfo.usualAdultDosage = text;
    this.administrationInfoChange.emit(this.administrationInfo);
  }

  /**
   * Update content for haemodialysis.
   * @param {string} text  Content for haemodialysis.
   */
  haemodialysisChanged(text: string) {
    this.administrationInfo.haemodialysis = text;
    this.administrationInfoChange.emit(this.administrationInfo);
  }

  /**
   * Update content for perotoneal dialysis.
   * @param {string} text  Content for perotoneal dialysis.
   */
  peritonealDialysisChanged(text: string) {
    this.administrationInfo.peritonealDialysis = text;
    this.administrationInfoChange.emit(this.administrationInfo);
  }

  /**
   * Update content for crrt.
   * @param {string} text  Content for crrt.
   */
  crrtChanged(text: string) {
    this.administrationInfo.crrt = text;
    this.administrationInfoChange.emit(this.administrationInfo);
  }

  /**
   * Update content for pregnancy.
   * @param {string} text  Content for pregnancy.
   */
  pregnancyChanged(text: string) {
    this.administrationInfo.pregnancy = text;
    this.administrationInfoChange.emit(this.administrationInfo);
  }

  /**
   * Update content for comments.
   * @param {string} text  Content for comments.
   */
  commentsChanged(text: string) {
    this.administrationInfo.comments = text;
    this.administrationInfoChange.emit(this.administrationInfo);
  }

  /**
   * Shows an alert which enables the user for changing the name of the the administration info.
   * @param {AdministrationInfo} administrationInfo    The administration info to update
   */
  showUpdateAdminInfoAlert(administrationInfo: AdministrationInfo) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Edit Administration Information');
    alert.addInput({
      value: this.administrationInfo.administration,
      name: 'newAdminInfoName',
      placeholder: 'Administration'
    });
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      cssClass: 'alertDanger',
      handler: () => {
      }
    });
    alert.addButton({
      text: 'Save',
      handler: (data) => {
        this.administrationInfo.administration = data.newAdminInfoName;
        this.antibioticService.updateAdministrationInfo(this.administrationInfo, this.antibioticId);
      }
    });
    alert.present();
  }

  /**
   * Shows an alert which enables the user to delete the administration info.
   * @param {AdministrationInfo} administrationInfo    The administration info to delete
   */
  showDeleteAdminInfoAlert(administrationInfo: AdministrationInfo) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Delete Administration Information');
    alert.setMessage('Are you sure you want to delete the administration information '
      + this.administrationInfo.administration + ' ?');
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      cssClass: 'alertDanger',
      handler: () => {
      }
    });
    alert.addButton({
      text: 'Delete',
      handler: () => {
        this.antibioticService.deleteAdministrationInfo(administrationInfo, this.antibioticId);
      }
    });
    alert.present();
  }

  /**
   * Opens the infection detail page.
   * @param {{infection: Infection; condition: Condition; treatment: Treatment}} reference    The reference to a treatment
   */
  showInfectionDetailPage(reference: {infection: Infection, condition: Condition, treatment: Treatment}) {
    this.navCtrl.push(InfectionDetailsPage, {infection: reference.infection, conditionName: reference.condition.name});
  }

  private initReferences(adminInfoTreatments: AdminInfoTreatment[]) {
    let references: {infection: Infection, condition: Condition, treatment: Treatment}[] = [];
    let fetchingOperations = [];
    for (let adminInfoTreatment of adminInfoTreatments) {
      fetchingOperations.push(
        this.infectionService.getReferenceByIds(
          adminInfoTreatment.infectionId, adminInfoTreatment.conditionId, adminInfoTreatment.treatmentId).then(reference => {
          references.push(reference);
        })
      );
    }
    Promise.all(fetchingOperations).then(() => {
      this.references = references;
    })
  }
}
