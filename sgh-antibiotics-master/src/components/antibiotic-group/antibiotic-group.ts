import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Antibiotic } from '../../entities/antibiotic';
import { AntibioticGroup } from '../../entities/antibiotic-group';
import { AlertController, ModalController } from 'ionic-angular';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { EditAntibioticComponent } from '../edit-antibiotic/edit-antibiotic';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Show and manage AntibioticGroups.
 */
@Component({
  selector: 'antibiotic-group',
  templateUrl: 'antibiotic-group.html'
})
export class AntibioticGroupComponent {
  @Input()
  public antibiotics: Antibiotic[];
  @Input()
  public antibioticGroup: AntibioticGroup;
  @Input()
  public searchTerms = '';
  public expanded = false;
  @Output()
  public onAntibioticGroupClicked = new EventEmitter<AntibioticGroupComponent>();
  @Output()
  public onAntibioticClicked = new EventEmitter<Antibiotic>();

  session: Session;

  constructor(public alertCtrl: AlertController, sessionService: SessionServiceProvider, public modalCtr: ModalController,
              private antibioticProvider: AntibioticProvider) {
    this.session = new Session();

    /**
     * Get session state.
     */
    sessionService.state.subscribe((session) => {
      this.session = session;
    })
  }

  /**
   * Emit selected antibiotic.
   * @param {Antibiotic} antibiotic
   */
  public onAntibioticClick(antibiotic: Antibiotic) {
    this.onAntibioticClicked.emit(antibiotic);
  }

  /**
   * Emit selected antibiotic group.
   */
  public onAntibioticGroupClick() {
    this.onAntibioticGroupClicked.emit(this);
  }

  /**
   * Alert for editing antibiotics group.
   * @param {AntibioticGroup} antibioticGroup
   */
  showEditAntibioticsGroupAlert(antibioticGroup: AntibioticGroup) {
    let alert = this.alertCtrl.create({
      title: 'Renaming',
      message: 'Choose a new name for ' + antibioticGroup.groupName,
      inputs: [
        {
          name: 'newName',
          placeholder: 'New group name',
          value: this.antibioticGroup.groupName
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
            antibioticGroup.groupName = data.newName;
            this.antibioticProvider.updateAntibioticGroup(antibioticGroup);
          }
        }
      ]
    });

    alert.present();
  }

  /**
   * Modal for editing antibiotic.
   * @param {Antibiotic} antibiotic
   */
  showEditAntibioticAlert(antibiotic: Antibiotic) {
    let modal = this.modalCtr.create(EditAntibioticComponent, {antibiotic: antibiotic});
    modal.present();
  }

  /**
   * Alert for deleting antibiotic.
   * @param {Antibiotic} antibiotic
   */
  showDeleteAntibioticAlert(antibiotic: Antibiotic) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Deleting ' + antibiotic.name);
    alert.setMessage(`This action can't be undone. Proceed?`);
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel',
    });
    alert.addButton({
      text: 'Delete',
      cssClass: 'alertDanger',
      handler: () => {
        this.antibioticProvider.deleteAntibiotic(antibiotic);
      }
    });
    alert.present();
  }

  /**
   * Alert for deleting antibiotics group.
   * @param {AntibioticGroup} antibioticGroup
   */
  showDeleteAntibioticsGroupAlert(antibioticGroup: AntibioticGroup) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Deleting group ' + antibioticGroup.groupName);
    alert.setMessage('Should you choose not to delete all related antimicrobials, they will be moved to <i>Miscellaneous</i>.');
    alert.addInput({
      type: 'checkbox',
      label: 'Delete related antimicrobials',
      value: 'cascadingDelete',
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
        this.antibioticProvider.deleteAntibioticGroup(antibioticGroup, cascadingDelete);
      }
    });
    alert.present();
  }

  /**
   * Alert for adding antibiotic.
   * @param {AntibioticGroup} antibioticGroup
   */
  showAddAntibioticAlert(antibioticGroup: AntibioticGroup){
    let alert = this.alertCtrl.create();
    alert.setTitle('Add Item to ' + antibioticGroup.groupName);
    alert.addInput({
      name: 'newAntibioticName',
      placeholder: 'Antimicrobial name'
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
        let newAntibiotic = {} as Antibiotic;
        newAntibiotic.name = data.newAntibioticName;
        newAntibiotic.groupId = antibioticGroup._id;
        this.antibioticProvider.addNewAntibiotic(newAntibiotic);
      }
    });
    alert.present();
  }
}
