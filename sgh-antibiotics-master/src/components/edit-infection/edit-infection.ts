import { Component, OnDestroy } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Infection } from '../../entities/infection';
import { InfectionProvider } from '../../providers/infection/infection';
import { InfectionCategory } from '../../entities/infection-category';
import { Subscription } from 'rxjs/Subscription';

/**
 * Show and edit the Infection name and switch the InfectionCategory.
 */
@Component({
  selector: 'edit-infection',
  templateUrl: 'edit-infection.html'
})
export class EditInfectionComponent implements OnDestroy {

  infection: Infection;
  infectionName: string;
  selectedInfectionCategoryId: string;

  infectionCategories: InfectionCategory[];
  infectionCategoriesSubscription: Subscription;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private infectionService: InfectionProvider) {
    this.infection = this.navParams.get('infection');
    this.infectionName = this.infection.name;
    this.infectionService.infectionCategories.subscribe(infectionCategories => {
      this.infectionCategories = infectionCategories;
      if (this.infection.categoryId != null && this.infection.categoryId != '') {
        this.selectedInfectionCategoryId = this.infection.categoryId;
      } else {
        this.selectedInfectionCategoryId = 'miscellaneous';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.infectionCategoriesSubscription != null) {
      this.infectionCategoriesSubscription.unsubscribe();
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    if (this.selectedInfectionCategoryId === 'miscellaneous') {
      this.infection.categoryId = null;
    } else {
      this.infection.categoryId = this.selectedInfectionCategoryId;
    }
    this.infection.name = this.infectionName;
    this.infectionService.updateInfection(this.infection);
    this.dismiss();
  }

}
