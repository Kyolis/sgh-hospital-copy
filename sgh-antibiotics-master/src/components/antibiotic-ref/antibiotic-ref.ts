import { Component, Input, OnDestroy } from '@angular/core';
import { Antibiotic } from '../../entities/antibiotic';
import { AdministrationInfo } from '../../entities/administration-info';
import { AntibioticDetailsPage } from '../../pages/antibiotic-details/antibiotic-details';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { AntibioticRefManagementComponent } from '../antibiotic-ref-management/antibiotic-ref-management';
import { Subscription } from 'rxjs/Subscription';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { AdminInfoTreatment } from '../../entities/admin-info-treatment';
import { AdminInfoTreatmentServiceProvider } from '../../providers/admin-info-treatment-service/admin-info-treatment-service';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Show AntibioticRefs.
 */
@Component({
  selector: 'antibiotic-ref',
  templateUrl: 'antibiotic-ref.html'
})
export class AntibioticRefComponent implements OnDestroy {

  _adminInfoTreatment: AdminInfoTreatment;
  @Input() treatmentId: string;
  @Input() conditionId: string;
  @Input() infectionId: string;

  referencedAntibiotic: Antibiotic;
  referencedAdministrationInfo: AdministrationInfo;

  session: Session;

  _antibioticsAdministrationInfo: { antibiotic: Antibiotic, administrationInfos: AdministrationInfo[] };

  antibioticsSubscription: Subscription;
  administrationInfoSubscription: Subscription;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController,
              public sessionService: SessionServiceProvider, private antibioticProvider: AntibioticProvider,
              private adminInfoTreatmentService: AdminInfoTreatmentServiceProvider) {
    this.session = new Session();
    sessionService.state.subscribe((session) => {
      this.session = session;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  get adminInfoTreatment(): AdminInfoTreatment {
    return this._adminInfoTreatment;
  }

  @Input()
  set adminInfoTreatment(value: AdminInfoTreatment) {
    this._adminInfoTreatment = value;
    this.subscribeToAll();
  }

  get antibioticsAdministrationInfo(): { antibiotic: Antibiotic, administrationInfos: AdministrationInfo[] } {
    return this._antibioticsAdministrationInfo;
  }

  set antibioticsAdministrationInfo(value: { antibiotic: Antibiotic, administrationInfos: AdministrationInfo[] }) {
    this._antibioticsAdministrationInfo = value;
    this.referencedAntibiotic = this.antibioticsAdministrationInfo.antibiotic;
    this.referencedAdministrationInfo =
      this.antibioticsAdministrationInfo.administrationInfos.find(
        adminInfo => adminInfo._id === this.adminInfoTreatment.administrationInfoId);
  }

  /**
   * Opens the antibiotic detail page.
   * @param {Antibiotic} antibiotic    The referenced antibiotic
   * @param {AdministrationInfo} administrationInfo    The referenced administration information
   */
  showAntibioticDetailPage(antibiotic: Antibiotic, administrationInfo: AdministrationInfo) {
    this.navCtrl.push(AntibioticDetailsPage,
      {antibiotic: antibiotic, administrationInfoName: administrationInfo.administration});
  }

  /**
   * Shows an alert that enables edit functionalities for antibiotics
   */
  showManageAntibioticRefAlert() {
    let modal = this.modalCtrl.create(AntibioticRefManagementComponent,
      {
        treatmentId: this.treatmentId, adminInfoTreatment: this.adminInfoTreatment,
        infectionId: this.infectionId, conditionId: this.conditionId
      });
    modal.present();
  }

  /**
   * Shows an alert that enables the user to delete an administration-info treatment reference.
   */
  showDeleteAdminInfoTreatmentAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Delete Antimicrobial Reference');
    alert.setMessage('Are you sure you want to delete the reference?');
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
        this.adminInfoTreatmentService.deleteAdminInfoTreatment(this.adminInfoTreatment);
      }
    });
    alert.present();
  }

  private subscribeToAll() {
    this.unsubscribeAll();
    this.antibioticsSubscription = this.antibioticProvider.antibiotics.subscribe(antibiotics => {
      let antibiotic = antibiotics.find(
        antibiotic => this.adminInfoTreatment.antibioticId === antibiotic._id);
      let adminInfoSubscription = antibiotic.administrationInfos.subscribe(administrationInfos => {
        this.antibioticsAdministrationInfo = {antibiotic: antibiotic, administrationInfos: administrationInfos};
        this.administrationInfoSubscription = adminInfoSubscription;
      });
    });
  }

  private unsubscribeAll() {
    if (this.antibioticsSubscription != null) {
      this.antibioticsSubscription.unsubscribe();
    }
    if (this.administrationInfoSubscription != null) {
      this.administrationInfoSubscription.unsubscribe();
    }
  }

}
