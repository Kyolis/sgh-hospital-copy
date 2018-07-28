import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AlertController, IonicPage, NavParams, Segment } from 'ionic-angular';
import { Antibiotic } from '../../entities/antibiotic';
import { AdministrationInfo } from '../../entities/administration-info';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { deepCopy } from 'ionic-angular/util/util';
import { Subscription } from 'rxjs/Subscription';
import { AntibioticProvider } from '../../providers/antibiotic/antibiotic';

/**
 * Display and manage Antibiotic data.
 */
@IonicPage()
@Component({
  selector: 'page-antibiotic-details',
  templateUrl: 'antibiotic-details.html',
})
export class AntibioticDetailsPage implements OnDestroy {

  @ViewChild(Segment) segment: Segment;

  private antibiotic: Antibiotic;
  public administrationInfos: AdministrationInfo[];
  private administrationInfoSubscription: Subscription;
  session: Session;

  private _selectedAdministrationName: string;
  private selectedAdministration: AdministrationInfo;

  constructor(public navParams: NavParams, public alertCtrl: AlertController,
              private sessionService: SessionServiceProvider, public antibioticProvider: AntibioticProvider) {
    this.session = new Session();
    this.sessionService.state.subscribe((session) => {
      this.session = session;
    });

    this.antibiotic = this.navParams.get('antibiotic');

    this.administrationInfoSubscription = this.antibiotic.administrationInfos.subscribe(administrationInfos => {
      this.administrationInfos = administrationInfos;
      this.setAdministrationInfoByName(this.selectedAdministrationName);
      let adminInfoName = this.navParams.get('administrationInfoName');
      if (adminInfoName != null) {
        this.selectedAdministrationName = adminInfoName;
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
    if (this.administrationInfoSubscription != null) {
      this.administrationInfoSubscription.unsubscribe();
    }
  }

  /**
   * Constantly getting the name of selected administration.
   * @returns {string}  Administration name.
   */
  get selectedAdministrationName(): string {
    return this._selectedAdministrationName;
  }

  /**
   * Setting selected administration name.
   * @param {string} value  Administration name.
   */
  set selectedAdministrationName(value: string) {
    this.setAdministrationInfoByName(value);
    this._selectedAdministrationName = value;
  }

  /**
   * Alert for adding administration.
   */
  showAddAdministrationAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Adding Antimicrobial Administration');
    alert.addInput({
      name: 'newAdministration',
      placeholder: 'Administration name'
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
        let administrationInfo = {} as AdministrationInfo;
        administrationInfo.administration = data.newAdministration;
        this.antibioticProvider.addNewAdministrationInfo(administrationInfo, this.antibiotic._id);
      }
    });
    alert.present();
  }

  /**
   * Save and update administration info.
   * @param {AdministrationInfo} administrationInfo  Administration, adverseReaction, dosages, monitoringParameters, monitoring-parameters and usualAdultDosage.
   */
  administrationInfoChange(administrationInfo: AdministrationInfo) {
    this.antibioticProvider.updateAdministrationInfo(deepCopy(this.selectedAdministration), this.antibiotic._id);
  }

  /**
   * Setting administration info by name.
   * @param {string} name  Administration name.
   */
  setAdministrationInfoByName(name: string) {
    let adminInfoFound = false;
    for (let adminInfo of this.administrationInfos) {
      if (adminInfo.administration === name) {
        this.selectedAdministration = adminInfo;
        adminInfoFound = true;
        break;
      }
    }
    if ((!adminInfoFound || this.selectedAdministration == null) && this.administrationInfos != null && this.administrationInfos.length > 0) {
      this.selectedAdministration = this.administrationInfos[0];
      this._selectedAdministrationName = this.selectedAdministration.administration;
    }
  }
}
