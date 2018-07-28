import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Condition } from '../../entities/condition';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { EditTextSettings } from '../edit-text/edit-text';
import { Treatment } from '../../entities/treatment';
import { AlertController } from 'ionic-angular';
import { InfectionProvider } from '../../providers/infection/infection';
import { Subscription } from 'rxjs/Subscription';

/**
 * Show and manage Conditions.
 */
@Component({
  selector: 'condition',
  templateUrl: 'condition.html'
})
export class ConditionComponent implements OnDestroy {

  _condition: Condition;
  private treatments: Treatment[];
  private treatmentSubscription: Subscription;

  @Input() infectionId: string;
  @Output() conditionChange = new EventEmitter();

  session: Session;
  editTextSettings = new EditTextSettings();

  constructor(public sessionService: SessionServiceProvider, private alertCtrl: AlertController,
              private infectionService: InfectionProvider) {
    this.editTextSettings.showSaveButton = false;
    this.editTextSettings.showResetButton = false;

    /**
     * Get session state.
     */
    sessionService.state.subscribe(session => {
      this.session = session;
    });
  }

  ngOnDestroy(): void {
    this.treatmentSubscription.unsubscribe();
  }

  get condition(): Condition {
    return this._condition;
  }

  @Input() set condition(value: Condition) {
    this._condition = value;
    this.treatmentSubscription = this.condition.treatments.subscribe(treatments => {
      this.treatments = treatments;
    });
  }

  showAddTreatmentAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Add Treatment');
    alert.addInput({
      name: 'newTreatmentHeader',
      placeholder: 'Treatment Header'
    });
    alert.addInput({
      name: 'newTreatmentSubHeader',
      placeholder: 'Treatment Sub-header'
    });
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      cssClass: 'alertDanger',
      handler: () => {}
    });
    alert.addButton({
      text: 'Add',
      handler: (data) => {
        let treatment = {} as Treatment;
        treatment.header = data.newTreatmentHeader;
        treatment.subheader = data.newTreatmentSubHeader;
        this.infectionService.addNewTreatment(treatment, this.condition._id, this.infectionId);
      }
    });
    alert.present();
  }

  showUpdateConditionAlert(condition: Condition) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Edit Condition');
    alert.addInput({
      value: this.condition.name,
      name: 'newConditionName',
      placeholder: 'Condition'
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
        condition.name = data.newConditionName;
        this.infectionService.updateCondition(condition, this.infectionId);
      }
    });
    alert.present();
  }

  showDeleteConditionAlert(condition: Condition) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Delete Condition');
    alert.setMessage('Are you sure you want to delete the condition ' + this.condition.name + ' ?');
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
        this.infectionService.deleteCondition(condition, this.infectionId);
      }
    });
    alert.present();
  }

  /**
   * Update content for overall treatment comments.
   * @param {string} comment  Content for overall treatment comments.
   */
  public commentChanged(comment: string) {
    this.condition.comment = comment;
    this.conditionChange.emit(this.condition);
  }

  /**
   * Update content for laboratory testing.
   * @param {string} laboratoryTesting  Contents for laboratory testing.
   */
  public laboratoryTestingChanged(laboratoryTesting: string) {
    this.condition.laboratoryTesting = laboratoryTesting;
    this.conditionChange.emit(this.condition);
  }

  /**
   * Update content for additional information.
   * @param {string} additionalInformation  Content for additional information.
   */
  public additionalInformationChanged(additionalInformation: string) {
    this.condition.additionalInformation = additionalInformation;
    this.conditionChange.emit(this.condition);
  }

}
