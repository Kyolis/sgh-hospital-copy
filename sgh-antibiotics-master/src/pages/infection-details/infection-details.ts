import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavParams, Segment } from 'ionic-angular';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { Subscription } from 'rxjs/Subscription';
import { Infection } from '../../entities/infection';
import { Condition } from '../../entities/condition';
import { InfectionProvider } from '../../providers/infection/infection';
import { deepCopy } from 'ionic-angular/util/util';

/**
 * The infection details UI.
 */
@IonicPage()
@Component({
  selector: 'page-infection-details',
  templateUrl: 'infection-details.html',
})
export class InfectionDetailsPage implements OnDestroy {


  @ViewChild(Segment) segment: Segment;

  private infection: Infection;
  public conditions: Condition[];
  private conditionsSubscription: Subscription;
  session: Session;

  private _selectedConditionName: string;
  private selectedCondition: Condition;

  constructor(public navParams: NavParams, public alertCtrl: AlertController,
              private sessionService: SessionServiceProvider, public infectionProvider: InfectionProvider) {
    this.session = new Session();
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });

    this.infection = this.navParams.get('infection');

    this.conditionsSubscription = this.infection.conditions.subscribe(conditions => {
      this.conditions = conditions;
      this.setConditionByName(this.selectedConditionName);
      let conditionName = this.navParams.get('conditionName');
      if (conditionName != null) {
        this.selectedConditionName = conditionName;
      }
      if (this.segment != null) {
        // HOTFIX
        setTimeout(() => {
          this.segment.ngAfterContentInit();
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.conditionsSubscription != null) {
      this.conditionsSubscription.unsubscribe();
    }
  }

  get selectedConditionName(): string {
    return this._selectedConditionName;
  }

  set selectedConditionName(value: string) {
    this.setConditionByName(value);
    this._selectedConditionName = value;
  }

  /**
   * Shows an alert to add conditions.
   */
  showAddConditionAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Add Condition');
    alert.addInput({
      name: 'newCondition',
      placeholder: 'Condition name'
    });
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
      cssClass: 'alertDanger',
      handler: () => {
      }
    });
    alert.addButton({
      text: 'Add',
      handler: (data) => {
        let condition = {} as Condition;
        condition.name = data.newCondition;
        this.infectionProvider.addNewCondition(condition, this.infection._id);
      }
    });
    alert.present();
  }

  /**
   * This method is called whenever a condition changed.
   * @param {Condition} condition    The updated condition
   */
  conditionChange(condition: Condition) {
    // HOTFIX: because creating a deep copy of an object containing ReplaySubjects results in circular JSON parsing
    delete condition.treatments;
    this.infectionProvider.updateCondition(deepCopy(condition), this.infection._id);
  }

  /**
   * Sets a condition by its name.
   * @param {string} name    The name of the condition
   */
  setConditionByName(name: string) {
    let conditionFound = false;
    for (let condition of this.conditions) {
      if (condition.name === name) {
        this.selectedCondition = condition;
        conditionFound = true;
        break;
      }
    }
    if ((!conditionFound || this.selectedCondition == null) && this.conditions != null && this.conditions.length > 0) {
      this.selectedCondition = this.conditions[0];
      this._selectedConditionName = this.selectedCondition.name;
    }
  }
}
