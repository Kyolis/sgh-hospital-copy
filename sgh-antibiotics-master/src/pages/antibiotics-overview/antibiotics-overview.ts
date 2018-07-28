import { Component, QueryList, ViewChildren } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { Antibiotic } from '../../entities/antibiotic';
import { AntibioticDetailsPage } from '../antibiotic-details/antibiotic-details';
import { AntibioticGroup } from '../../entities/antibiotic-group';
import { AntibioticGroupComponent } from '../../components/antibiotic-group/antibiotic-group';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Antibiotics overview UI.
 */
@IonicPage()
@Component({
  selector: 'page-antibiotics-overview',
  templateUrl: 'antibiotics-overview.html',
})
export class AntibioticsOverviewPage {
  public antibiotics: Antibiotic[];
  public antibioticGroups: AntibioticGroup[];
  public searchTerms: string = '';
  @ViewChildren(AntibioticGroupComponent) viewChildren: QueryList<AntibioticGroupComponent>;
  session: Session;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private antibioticProvider: AntibioticProvider,
              private sessionService: SessionServiceProvider) {
    this.session = new Session();
    /**
     * Get session state.
     */
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });

    /**
     * Get antibiotics from database.
     */
    this.antibioticProvider.antibiotics.subscribe((antibiotics) => {
      this.antibiotics = antibiotics;
    });

    /**
     * Get antibitoicGroup from database.
     */
    this.antibioticProvider.antibioticGroups.subscribe((antibioticGroups) => {
      this.antibioticGroups = [];
      const miscGroup = new AntibioticGroup();
      miscGroup.groupName = 'Miscellaneous';
      miscGroup.isMiscellaneous = true;
      miscGroup._id = null;
      miscGroup.userSort = -1;
      this.antibioticGroups.push(miscGroup);
      this.antibioticGroups.push(...antibioticGroups);
    });
  }

  ionViewDidLoad(){
    this.sessionService.loadStatus();
  }

  ionViewWillLeave(){
    this.sessionService.connected.unsubscribe();
    this.sessionService.disconnected.unsubscribe();
  }

  /**
   * View individual antibiotic details.
   * @param {Antibiotic} antibiotic  administrationInfos, groupId and name.
   */
  openAntibioticDetails(antibiotic: Antibiotic) {
    this.navCtrl.push(AntibioticDetailsPage, {antibiotic});
  }

  /**
   * Open/close antibiotic group item.
   * @param {AntibioticGroupComponent} groupComponent  antiobioticGroup, antibiotics, expanded(true or false) and searchTerms.
   */
  onAntibioticsGroupClicked(groupComponent: AntibioticGroupComponent) {
    groupComponent.expanded = !groupComponent.expanded;
    if (groupComponent.expanded) {
      this.viewChildren.filter((groupItem) => {
        return groupItem.antibioticGroup._id !== groupComponent.antibioticGroup._id
      }).forEach((groupItem) => {
        groupItem.expanded = false;
      })
    }
  }

  /**
   * Filter and show antibiotics according to search input.
   */
  onSearchInput() {
    this.viewChildren.forEach((groupComponent) => groupComponent.expanded = this.searchTerms.length > 0);
  }

  /**
   * Alert for adding antibiotic group.
   */
  showAddAntibioticGroupAlert(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Adding Antimicrobials Group');
    alert.addInput({
      name: 'newAntibioticGroupName',
      placeholder: 'Antimicrobial group name'
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
        let antibioticGroup = {} as AntibioticGroup;
        antibioticGroup.groupName = data.newAntibioticGroupName;
        this.antibioticProvider.addNewAntibioticGroup(antibioticGroup);
      }
    });
    alert.present();
  }

}
