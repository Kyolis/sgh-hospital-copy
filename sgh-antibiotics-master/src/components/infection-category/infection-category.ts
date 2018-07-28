import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { AlertController, ModalController } from 'ionic-angular';
import { Infection } from '../../entities/infection';
import { InfectionCategory } from '../../entities/infection-category';
import { InfectionProvider } from '../../providers/infection/infection';
import { EditInfectionComponent } from '../edit-infection/edit-infection';

/**
 * Show and edit a InfectionCategory.
 */
@Component({
  selector: 'infection-category',
  templateUrl: 'infection-category.html'
})
export class InfectionCategoryComponent {
  @Input()
  public infections: Infection[];
  @Input()
  public infectionCategory: InfectionCategory;
  @Input()
  public searchTerms = '';
  public expanded = false;
  @Output()
  public onInfectionCategoryClicked = new EventEmitter<InfectionCategoryComponent>();
  @Output()
  public onInfectionClicked = new EventEmitter<Infection>();

  session: Session;

  constructor(public alertCtrl: AlertController, sessionService: SessionServiceProvider, public modalCtrl: ModalController,
              private infectionProvider: InfectionProvider) {
    this.session = new Session();

    /**
     * Get session state.
     */
    sessionService.state.subscribe((session) => {
      this.session = session;
    })
  }

  /**
   * Emit selected infection.
   * @param {Infection} infection
   */
  public onInfectionClick(infection: Infection) {
    this.onInfectionClicked.emit(infection);
  }

  /**
   * Emit selected infection category.
   */
  public onInfectionCategoryClick() {
    this.onInfectionCategoryClicked.emit(this);
  }

  /**
   * Alert for editing infection category.
   * @param {InfectionCategory} infectionCategory
   */
  showEditInfectionCategoryAlert(infectionCategory: InfectionCategory) {
    let alert = this.alertCtrl.create({
      title: 'Renaming',
      message: 'Choose a new name for ' + infectionCategory.name,
      inputs: [
        {
          value: this.infectionCategory.name,
          name: 'newName',
          placeholder: 'New category name'
        },
      ],
      cssClass: 'alertButtonCSS',
      buttons: [
        {
          text: 'Cancel',
          cssClass: 'alertDanger',
          handler: () => {}
        },
        {
          text: 'Save',
          handler: (data) => {
            infectionCategory.name = data.newName;
            console.error(`this.hospitalService.updateInfectionCategory(infectionCategory); not yet implemented`);
            this.infectionProvider.updateInfectionCategory(infectionCategory);
          }
        }
      ]
    });

    alert.present();
  }

  /**
   * Alert for deleting infection category.
   * @param {InfectionCategory} infectionCategory
   */
  showDeleteInfectionCategoryAlert(infectionCategory: InfectionCategory) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Deleting group ' + infectionCategory.name);
    alert.setMessage('Should you choose not to delete all related infections, they will be moved to <i>Miscellaneous</i>.');
    alert.addInput({
      type: 'checkbox',
      label: 'Delete related infections',
      checked: false
    });

    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
    });
    alert.addButton({
      text: 'Delete',
      cssClass: 'alertDanger',
      handler: data => {
        const cascadingDelete = data.length > 0;
        this.infectionProvider.deleteInfectionCategory(infectionCategory, cascadingDelete);
      }
    });
    alert.present();
  }

  /**
   * Alert for adding infection.
   * @param {InfectionCategory} infectionCategory
   */
  showAddInfectionAlert(infectionCategory: InfectionCategory){
    let alert = this.alertCtrl.create();
    alert.setTitle('Add Item to ' + infectionCategory.name);
    alert.addInput({
      name: 'newInfectionName',
      placeholder: 'Infection name'
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
        let newInfection = {} as Infection;
        newInfection.name = data.newInfectionName;
        newInfection.categoryId = infectionCategory._id;
        this.infectionProvider.addInfection(newInfection);
      }
    });
    alert.present();
  }

  showEditInfectionAlert(infection: Infection) {
    let modal = this.modalCtrl.create(EditInfectionComponent, {infection: infection});
    modal.present();
  }

  showDeleteInfectionAlert(infection: Infection) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Deleting infection ' + infection.name);
    alert.setMessage('Are you sure you want to delete the infection?');
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
    });
    alert.addButton({
      text: 'Delete',
      cssClass: 'alertDanger',
      handler: () => {
        this.infectionProvider.deleteInfection(infection);
      }
    });
    alert.present();
  }
}
