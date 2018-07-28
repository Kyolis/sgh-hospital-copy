import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, IonicPage, NavController, ToastController } from 'ionic-angular';
import { HospitalProvider } from '../../providers/hospital/hospital';
import { Hospital, Release } from '../../entities/hospital';
import { HospitalDetailsPage } from '../hospital-details/hospital-details';
import { Subscription } from 'rxjs/Subscription';

/**
 * The hospital management UI.
 */
@IonicPage()
@Component({
  selector: 'page-hospital-management',
  templateUrl: 'hospital-management.html',
})
export class HospitalManagementPage implements OnInit, OnDestroy {
  public searchTerm: string = '';
  public hospital: Hospital;
  public hospitals: Hospital[] = [];
  private hospitalsSubscription: Subscription;

  constructor(public navCtrl: NavController,
              private hospitalService: HospitalProvider,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
  }

  ngOnInit(): void {
    this.hospitalsSubscription = this.hospitalService.hospitals.subscribe(hospitals => {
      this.hospitals = hospitals;
    });
  }

  ngOnDestroy(): void {
    if (this.hospitalsSubscription)
      this.hospitalsSubscription.unsubscribe();
  }

  /**
   * Opens a modal which allows the user to add hospitals.
   */
  showAddHospitalModal() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Add Hospital');
    alert.setMessage(`Please choose a name for the new hospital.`);
    alert.addInput({
      name: 'hospitalName',
      placeholder: 'Name for the new hospital'
    });
    alert.addButton({
      text: 'Cancel'
    });
    alert.addButton({
      text: 'Save',
      handler: (data) => {
        const hospitalName = data.hospitalName;
        const hospital = new Hospital();
        if (!hospitalName) {
          alert.dismiss();
          this.toastCtrl.create({message: `Error: Name can't be empty. Please try again.`, duration: 5000}).present();
        } else {
          const release = new Release();
          release.state = 'TODO';
          release.comments = 'Initial Release with empty Database.';
          release.timestamp = Math.floor(Date.now()).toString();
          hospital.releases.push(release);
          hospital.name = hospitalName;
          this.hospitalService.addNewHospital(JSON.parse(JSON.stringify(hospital))).then(() => {
            this.toastCtrl.create({message: `Hospital ${hospital.name} created`, duration: 5000}).present();
          });
        }
      }
    });
    alert.present();
  }

  /**
   * Opens the hospital details page.
   * @param {string} hospitalId    The ID of the hospital
   */
  openHospitalDetails(hospitalId: string) {
    this.navCtrl.push(HospitalDetailsPage, {hospitalId});
  }

  /**
   * NOTE: the deletion of hospitals is currently not possible due to deadlines set by google.
   * Normally this method should trigger a cloud function which recursively deletes a hospital. But currently
   * deleting collections recursively is not possible. All manual attempts ran into the 50s deadline for cloud
   * functions -> Workaround: Manually delete hospital via the firebase-console.
   */
  deleteHospital(hospital: Hospital) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Delete Hospital');
    alert.setMessage(`<p>This hospital will be marked as deleted, but not actually removed from the database.</p>
    <p>To free up the disk space used, you will need to use the firebase console.</p>
    <p>Please keep in mind to select another hospital in your settings after deleting.</p>
    <p>All other users which selected this hospital will be logged out.</p>
    <p>Please have a look at the the chapter 
    <i>Hospital Management</i> of the Admin Guide.</p>`);
    alert.addButton({
      text: 'Cancel'
    });
    alert.addButton({
      text: 'Delete',
      cssClass: 'alertDanger',
      handler: () => {
        this.hospitalService.deleteHospital(hospital).then(() => {
          this.toastCtrl.create({message: `${hospital.name} successfully deleted.`, duration: 3000}).present();
        }).catch(err => {
          this.toastCtrl.create({message: `Can't delete hospital: ${err}`, duration: 5000}).present();
        });
      }
    });
    alert.present();
  }
}
