import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavParams, ViewController } from 'ionic-angular';
import { Antibiotic } from '../../entities/antibiotic';
import { AntibioticGroup } from '../../entities/antibiotic-group';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Show and manage the Antibiotic name and switch the AntibioticGroup.
 */
@Component({
  selector: 'edit-antibiotic',
  templateUrl: 'edit-antibiotic.html'
})
export class EditAntibioticComponent {

  antibiotic: Antibiotic;
  antibioticName: string;
  selectedAntibioticGroupId: string;

  antibioticGroups: AntibioticGroup[];
  antibioticGroupsSubscription: Subscription;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private antibioticProvider: AntibioticProvider) {
    this.antibiotic = this.navParams.get('antibiotic');
    this.antibioticName = this.antibiotic.name;
    this.antibioticProvider.antibioticGroups.subscribe(antibioticGroups => {
      this.antibioticGroups = antibioticGroups;
      if (this.antibiotic.groupId != null && this.antibiotic.groupId != '') {
        this.selectedAntibioticGroupId = this.antibiotic.groupId;
      } else {
        this.selectedAntibioticGroupId = 'miscellaneous';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.antibioticGroupsSubscription != null) {
      this.antibioticGroupsSubscription.unsubscribe();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    if (this.selectedAntibioticGroupId === 'miscellaneous') {
      this.antibiotic.groupId = null;
    } else {
      this.antibiotic.groupId = this.selectedAntibioticGroupId;
    }
    this.antibiotic.name = this.antibioticName;
    this.antibioticProvider.updateAntibiotic(this.antibiotic);
    this.dismiss();
  }

}
