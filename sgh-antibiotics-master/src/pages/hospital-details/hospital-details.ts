import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Hospital, Release } from '../../entities/hospital';
import { HospitalProvider } from '../../providers/hospital/hospital';
import { Subscription } from 'rxjs/Subscription';

/**
 * The hospital detail UI.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-details',
  templateUrl: 'hospital-details.html',
})
export class HospitalDetailsPage implements OnInit, OnDestroy {
  @Input('hospital')
  public hospital: Hospital;
  hospitalSubscription: Subscription;
  selectedRelease: Release;
  isInProgress: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private hospitalProvider: HospitalProvider,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
  }

  ngOnInit(): void {
    const hospitalId = this.navParams.get('hospitalId');
    this.hospitalSubscription = this.hospitalProvider.getHospital(hospitalId).subscribe(hospital => {
      this.hospital = hospital;
      this.selectedRelease = this.hospital.releases.find(release => release.timestamp === this.hospital.live_db);
      this.isInProgress = this.hospital.releases.some(release => release.state === "IN_PROGRESS" || release.state === "DELETING");
    });
  }

  ngOnDestroy(): void {
    if (this.hospitalSubscription)
      this.hospitalSubscription.unsubscribe();
  }

  /**
   * Alert for adding release.
   */
  showAddReleaseModal() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Release a new DB Version');
    alert.setMessage(`Please add a brief description of your changes`);
    alert.addInput({
      name: 'comments',
      placeholder: 'Please insert comments'
    });
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel'
    });
    alert.addButton({
      text: 'Create Release',
      handler: (data) => {
        const release = {comments: data.comments, state: "TODO" as ("TODO"), timestamp: Date.now().toString()};
        this.hospital.releases.push(release);
        this.hospitalProvider.updateHospital(this.hospital);
      }
    });
    alert.present();
  }

  /**
   * Alert for deploy release to liveDb.
   */
  setLiveDb(release: Release, index: number) {
    let alert = this.alertCtrl.create({
      title: 'Deploy Release',
      subTitle: `Deploy release ${index + 1} to all devices.`,
      message: `You are about to deploy release ${index + 1} to all users. Proceed?`,
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Deploy",
          handler: () => {
            this.selectedRelease = release;
            this.hospital.live_db = release.timestamp.toString();
            this.hospitalProvider.updateHospital(this.hospital);
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Alert for deleting release.
   */
  deleteRelease(release: Release, index: number) {
    let alert = this.alertCtrl.create({
      title: 'Delete Database Release',
      message: `You are about to delete release ${index + 1}. This action cannot be undone.
       Proceed anyway?`,
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Delete',
          cssClass: 'alertDanger',
          handler: () => {
            const index = this.hospital.releases.indexOf(release);
            release.state = "DELETE";
            this.hospital.releases[index] = release;
            this.hospitalProvider.updateHospital(this.hospital).catch(err => {
              console.error(err);
            });
          }
        }
      ]
    });
    alert.setCssClass('alertButtonCSS');
    alert.present();
  }

  /**
   * Alert for changing hospital name.
   */
  editName() {
    const alert = this.alertCtrl.create();
    alert.setTitle('Change Hospital Name');
    alert.addInput({
      name: 'Name',
      value: this.hospital.name,
    });
    alert.setCssClass('alertButtonCSS');
    alert.addButton({
      text: 'Cancel'
    });
    alert.addButton({
      text: 'OK',
      handler: (data) => {
        if (data.Name.length == 0) {
          this.toastCtrl.create({message: `Please enter a valid name and try again.`, duration: 5000}).present();
          return;
        }
        this.hospital.name = data.Name;
        this.hospitalProvider.updateHospital(this.hospital);
      }
    });
    alert.present();
  }
}
