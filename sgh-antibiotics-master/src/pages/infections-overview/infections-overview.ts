import { Component, QueryList, ViewChildren } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { Infection } from '../../entities/infection';
import { InfectionCategory } from '../../entities/infection-category';
import { InfectionCategoryComponent } from '../../components/infection-category/infection-category';
import { InfectionProvider } from '../../providers/infection/infection';
import { InfectionDetailsPage } from '../infection-details/infection-details';

/**
 * The infection overview UI
 */
@IonicPage()
@Component({
  selector: 'page-infections-overview',
  templateUrl: 'infections-overview.html',
})
export class InfectionsOverviewPage {
  public infections: Infection[];
  public infectionCategories: InfectionCategory[];
  public searchTerms: string = '';
  @ViewChildren(InfectionCategoryComponent) viewChildren: QueryList<InfectionCategoryComponent>;
  session: Session;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private infectionProvider: InfectionProvider,
              private sessionService: SessionServiceProvider) {
    this.session = new Session();
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });
    this.infectionProvider.infections.subscribe((infections) => {
      this.infections = infections;
    });
    this.infectionProvider.infectionCategories.subscribe((infectionCategories) => {
      this.infectionCategories = [];
      const miscGroup = new InfectionCategory();
      miscGroup.name = 'Miscellaneous';
      miscGroup.isMiscellaneous = true;
      miscGroup._id = null;
      this.infectionCategories.push(miscGroup);
      this.infectionCategories.push(...infectionCategories);
    });
  }

  /**
   * Opens an infection detail page.
   * @param {Infection} infection    The infection to open the detail page for
   */
  openInfectionDetails(infection: Infection) {
    this.navCtrl.push(InfectionDetailsPage, {infection});
  }

  /**
   * This method is called whenever an infection category is clicked.
   * @param {InfectionCategoryComponent} infectionCategoryComponent    The clicked component
   */
  onInfectionCategoryClicked(infectionCategoryComponent: InfectionCategoryComponent) {
    infectionCategoryComponent.expanded = !infectionCategoryComponent.expanded;
    if (infectionCategoryComponent.expanded) {
      this.viewChildren.filter((categoryItem) => {
        return categoryItem.infectionCategory._id !== infectionCategoryComponent.infectionCategory._id
      }).forEach((category) => {
        category.expanded = false;
      })
    }
  }

  /**
   * Expands an infection category if it is within the search results.
   */
  onSearchInput() {
    this.viewChildren.forEach((categoryComponent) => categoryComponent.expanded = this.searchTerms.length > 0);
  }

  /**
   * Opens an alert to add infection categories.
   */
  showAddInfectionCategoryAlert(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Add Infection Category');
    alert.addInput({
      name: 'newInfectionCategoryName',
      placeholder: 'Infection category name'
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
        let infectionCategory = {} as InfectionCategory;
        infectionCategory.name = data.newInfectionCategoryName;
        this.infectionProvider.addInfectionCategory(infectionCategory);
      }
    });
    alert.present();
  }

}
