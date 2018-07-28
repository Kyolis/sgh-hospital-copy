import { Component, Input, OnDestroy } from '@angular/core';
import { Treatment } from '../../entities/treatment';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { AlertController, ModalController, NavController } from 'ionic-angular';
import { Condition } from '../../entities/condition';
import { InfectionProvider } from '../../providers/infection/infection';
import { AntibioticRefManagementComponent } from '../antibiotic-ref-management/antibiotic-ref-management';
import { AdminInfoTreatment } from '../../entities/admin-info-treatment';
import { AdminInfoTreatmentServiceProvider } from '../../providers/admin-info-treatment-service/admin-info-treatment-service';
import { Subscription } from 'rxjs/Subscription';

/**
 * The treatment UI
 */
@Component({
  selector: 'treatment',
  templateUrl: 'treatment.html'
})
export class TreatmentComponent implements OnDestroy {

  _treatment: Treatment;
  @Input() condition: Condition;
  @Input() infectionId: string;

  adminInfoTreatments: AdminInfoTreatment[];

  adminInfoTreatmentsSubscription: Subscription;

  session: Session;

  constructor(public navCtrl: NavController, public sessionService: SessionServiceProvider, public alertCtrl: AlertController,
              public modalCtrl: ModalController, private infectionService: InfectionProvider,
              private adminInfoTreatmentService: AdminInfoTreatmentServiceProvider) {
    this.session = new Session();
    sessionService.state.subscribe((session) => {
      this.session = session;
    });
  }


  ngOnDestroy(): void {
    if (this.adminInfoTreatmentsSubscription != null) {
      this.adminInfoTreatmentsSubscription.unsubscribe();
    }
  }

  get treatment(): Treatment {
    return this._treatment;
  }

  @Input() set treatment(value: Treatment) {
    this._treatment = value;
    this.adminInfoTreatmentService.adminInfoTreatments.subscribe(adminInfoTreatments => {
      this.adminInfoTreatments = adminInfoTreatments.filter(adminInfoTreatment => {
        return adminInfoTreatment.treatmentId === this.treatment._id
          && adminInfoTreatment.infectionId === this.infectionId && adminInfoTreatment.conditionId === this.condition._id;
      });
    });
  }

  showUpdateTreatmentAlert(treatment: Treatment) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Edit Treatment');
    alert.addInput({
      value: treatment.header,
      name: 'newTreatmentHeader',
      placeholder: 'Treatment Header'
    });
    alert.addInput({
      value: treatment.subheader,
      name: 'newTreatmentSubHeader',
      placeholder: 'Treatment Sub-header'
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
        treatment.header = data.newTreatmentHeader;
        treatment.subheader = data.newTreatmentSubHeader;
        this.infectionService.updateTreatment(treatment, this.condition._id, this.infectionId);
      }
    });
    alert.present();
  }

  showDeleteTreatmentAlert(treatment: Treatment) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Delete Treatment');
    alert.setMessage('Are you sure you want to delete the treatment ' + treatment.header + ' ?');
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
        this.infectionService.deleteTreatment(treatment, this.condition._id, this.infectionId);
      }
    });
    alert.present();
  }

  showManageAntibioticRefAlert() {
    let modal = this.modalCtrl.create(AntibioticRefManagementComponent,
      {
        treatmentId: this.treatment._id, infectionId: this.infectionId,
        conditionId: this.condition._id
      });
    modal.present();
  }

}
