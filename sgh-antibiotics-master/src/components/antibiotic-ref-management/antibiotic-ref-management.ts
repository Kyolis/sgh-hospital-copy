import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Antibiotic } from '../../entities/antibiotic';
import { AdministrationInfo } from '../../entities/administration-info';
import { Subscription } from 'rxjs/Subscription';
import { deepCopy } from 'ionic-angular/util/util';
import { AdminInfoTreatment } from '../../entities/admin-info-treatment';
import { AdminInfoTreatmentServiceProvider } from '../../providers/admin-info-treatment-service/admin-info-treatment-service';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * The administration-info treatment reference management UI
 */
@Component({
  selector: 'antibiotic-ref-management',
  templateUrl: 'antibiotic-ref-management.html'
})
export class AntibioticRefManagementComponent implements OnDestroy {

  isEditAdminInfoTreatment: boolean;
  _type: string = '';

  treatmentId: string;
  infectionId: string;
  conditionId: string;

  adminInfoTreatment: AdminInfoTreatment;

  antibiotics: Antibiotic[];
  administrationInfos: AdministrationInfo[];

  antibioticSubscription: Subscription;
  administrationInfosSubscription: Subscription;

  _selectedAntibioticId: string = '';
  _selectedAdministrationInfoId: string = '';

  constructor(public navParams: NavParams, public viewCtrl: ViewController,
              private antibioticProvider: AntibioticProvider,
              private adminInfoTreatmentService: AdminInfoTreatmentServiceProvider) {

    if (this.navParams.get('adminInfoTreatment') != null) {
      this.adminInfoTreatment = deepCopy(this.navParams.get('adminInfoTreatment'));
    }
    this.treatmentId = this.navParams.get('treatmentId');
    this.infectionId = this.navParams.get('infectionId');
    this.conditionId = this.navParams.get('conditionId');
    this.isEditAdminInfoTreatment = this.adminInfoTreatment != null;
    this.antibioticSubscription = this.antibioticProvider.antibiotics.subscribe(antibiotics => {
      this.antibiotics = antibiotics;
      this.initAdminInfoTreatment();
    });
  }

  ngOnDestroy(): void {
    if (this.antibioticSubscription != null) this.antibioticSubscription.unsubscribe();
    if (this.administrationInfosSubscription != null) this.administrationInfosSubscription.unsubscribe();
  }

  get selectedAntibioticId(): string {
    return this._selectedAntibioticId;
  }

  set selectedAntibioticId(value: string) {
    this._selectedAntibioticId = value;
    if (value != null && value != '') {
      this.administrationInfosSubscription = this.antibiotics.filter((antibiotic) => antibiotic._id === value)[0]
        .administrationInfos.subscribe(administrationInfos => {
          this.administrationInfos = administrationInfos;
          if (this.administrationInfos != null && this.administrationInfos.length > 0) {
            this.selectedAdministrationInfoId = this.administrationInfos[0]._id;
          }
        });
      if (this.adminInfoTreatment != null) {
        this.adminInfoTreatment.antibioticId = value;
      }
    }
  }

  get selectedAdministrationInfoId(): string {
    return this._selectedAdministrationInfoId;
  }

  set selectedAdministrationInfoId(value: string) {
    this._selectedAdministrationInfoId = value;
    if (this.adminInfoTreatment != null) {
      this.adminInfoTreatment.administrationInfoId = value;
    }
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
    if (this.adminInfoTreatment != null) {
      if (value == 'additional') {
        this.adminInfoTreatment.isAdditional = true;
        this.adminInfoTreatment.isOptional = false;
      } else if (value == 'optional') {
        this.adminInfoTreatment.isOptional = true;
        this.adminInfoTreatment.isAdditional = false;
      } else {
        this.adminInfoTreatment.isAdditional = false;
        this.adminInfoTreatment.isOptional = false;
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   * Saves administration-info treatments.
   */
  save() {
    if (!this.isEditAdminInfoTreatment) {
      this.adminInfoTreatmentService.addAdminInfoTreatment(JSON.parse(JSON.stringify(this.adminInfoTreatment)));
    } else {
      this.adminInfoTreatmentService.updateAdminInfoTreatment(JSON.parse(JSON.stringify(this.adminInfoTreatment)));
    }
    this.dismiss();
  }

  /**
   * Initializes administration info treatments.
   */
  initAdminInfoTreatment() {
    if (this.isEditAdminInfoTreatment) {
      this.selectedAntibioticId = this.adminInfoTreatment.antibioticId;
      this.selectedAdministrationInfoId = this.adminInfoTreatment.administrationInfoId;
      if (this.adminInfoTreatment.isAdditional) this.type = 'additional';
      if (this.adminInfoTreatment.isOptional) this.type = 'optional';
    } else {
      this.adminInfoTreatment = new AdminInfoTreatment();
      this.adminInfoTreatment.infectionId = this.infectionId;
      this.adminInfoTreatment.conditionId = this.conditionId;
      this.adminInfoTreatment.treatmentId = this.treatmentId;
    }
  }

}
