import { Injectable } from '@angular/core';
import { Session, SessionServiceProvider } from '../session-service/session-service';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from 'angularfire2/firestore';
import { HospitalProvider } from '../hospital/hospital';
import { AdminInfoTreatment } from '../../entities/admin-info-treatment';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { CopyUtil } from '../../entities/copy-util';

/**
 * Provider for subscribing and managing Links between AdministrationInfo and Treatments.
 */
@Injectable()
export class AdminInfoTreatmentServiceProvider {
  public adminInfoTreatments = new ReplaySubject<AdminInfoTreatment[]>(1);

  private session: Session;
  private _basePath: string = 'illegal';
  private adminInfoTreatmentsSubscription: Subscription;

  constructor(private afs: AngularFirestore,
              private sessionService: SessionServiceProvider,
              private hospitalProvider: HospitalProvider) {
    this.sessionService.state.subscribe(session => {
      this.session = session;
      if (session.loggedIn) {
        this.hospitalProvider.basePath.subscribe(basePath => {
          this.basePath = basePath;
        });
      } else {
        this.unsubscribeAllSubscriptions();
      }
    });
  }

  get basePath(): string {
    if (this._basePath === 'illegal') throw new Error('Illegal access to getBasePath: basePath is `illegal`');
    return this._basePath;
  }

  set basePath(value: string) {
    this._basePath = value;
    if (value === 'illegal') {
      this.unsubscribeAllSubscriptions();
    } else {
      this.subscribeToAdminInfoTreatments();
    }
  }

  /**
   * Creates subscriptions for admin info treatments.
   */
  subscribeToAdminInfoTreatments() {
    this.adminInfoTreatmentsSubscription =
      this.afs.collection(`${this.basePath}/adminInfoTreatments`, ref => ref.orderBy('created')).snapshotChanges().map(actions => {
        return actions.map(action => {
          const adminInfoTreatment = action.payload.doc.data() as AdminInfoTreatment;
          adminInfoTreatment._id = action.payload.doc.id;
          return adminInfoTreatment;
        })
      }).subscribe(this.adminInfoTreatments);
  }

  /**
   * Unsubscribes all subscriptions.
   */
  unsubscribeAllSubscriptions() {
    if (this.adminInfoTreatmentsSubscription != null) {
      this.adminInfoTreatmentsSubscription.unsubscribe();
    }
  }

  /**
   * Adds an administration info treatment.
   * @param {AdminInfoTreatment} adminInfoTreatment    The administration info treatment reference to add
   */
  addAdminInfoTreatment(adminInfoTreatment: AdminInfoTreatment) {
    adminInfoTreatment.created = Date.now() / 1000 | 0;
    const infectionsDoc = this.afs.collection(`${this.basePath}/adminInfoTreatments/`);
    infectionsDoc.add(adminInfoTreatment).then(() => {
      console.log('Successfully added administration info treatment: ', adminInfoTreatment._id);
    }).catch(err => {
      console.error('An error occurred while adding administration info treatment', adminInfoTreatment._id + '. ', err);
    });
  }

  /**
   * Updates an administration info treatment reference.
   * @param {AdminInfoTreatment} adminInfoTreatment    The updated administration info treatment reference.
   */
  updateAdminInfoTreatment(adminInfoTreatment: AdminInfoTreatment) {
    const adminInfoTreatmentDoc =
      this.afs.doc(`${this.basePath}/adminInfoTreatments/${adminInfoTreatment._id}`);
    const data = CopyUtil.copy(adminInfoTreatment);
    adminInfoTreatmentDoc.update(data).then(() => {
      console.log('Successfully updated administration info treatment');
    }).catch(err => {
      console.error('An error occurred while updating administration info treatment.', err);
    });
  }

  /**
   * Deletes an administration info treatment.
   * @param {AdminInfoTreatment} adminInfoTreatment    the administration info treatment reference to delete
   * @returns {Promise<void>}
   */
  deleteAdminInfoTreatment(adminInfoTreatment: AdminInfoTreatment) {
    const adminInfoTreatmentDoc = this.afs.doc(
      `${this.basePath}/adminInfoTreatments/${adminInfoTreatment._id}`);
    return adminInfoTreatmentDoc.delete().then(() => {
      console.log('Successfully deleted administration info treatment.');
    }).catch(err => {
      console.error('An error occurred while deleting an administration info treatment.', err);
    });
  }

}
