import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Session, SessionServiceProvider } from '../session-service/session-service';
import { Hospital } from '../../entities/hospital';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/first';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

/**
 * Provider for subscribing to Hospital data changes and managing Hospital data.
 * This Provider also provides a ReplaySubject for basePath for providers that depend
 * on the selected database and release.
 */
@Injectable()
export class HospitalProvider {
  private session: Session;
  private hospital: Hospital;

  // Path which reflects the selected hospital, selected db and release.
  public basePath = new ReplaySubject<string>(1);

  private hospitalsSubscription: Subscription;
  public hospitals = new ReplaySubject<Hospital[]>(1);

  constructor(private afs: AngularFirestore, private sessionService: SessionServiceProvider) {
    this.sessionService.state.subscribe(session => {
      this.session = session;
      if (session.loggedIn && session.hospitalId && session.hospitalId !== '') {
        this.subscribeAll();
      } else {
        this.hospital = null;
        this.basePath.next('illegal');
        this.unsubscribeAll();
      }
    });
  }

  /**
   * Subscribe to the changes of one specific hospital.
   * @param {string} hospitalId id of hospital to subscribe
   * @returns {Observable<Hospital>}
   */
  getHospital(hospitalId: string): Observable<Hospital> {
    return this.afs.doc<Hospital>(`/hospitals/${hospitalId}`).snapshotChanges().map(snapshot => {
      const hospital = snapshot.payload.data() as Hospital;
      hospital.id = snapshot.payload.id;
      return hospital;
    })
  }

  /**
   * Add new Hospital
   * @param {Hospital} newHospital
   */
  addNewHospital(newHospital: Hospital) {
    const hospitalCol = this.afs.collection(`/hospitals`);
    return hospitalCol.add(newHospital).then((hospitalDoc) => {
      return hospitalDoc.collection(`/dbs`).doc(`/staging_db`).set({}).then(() => {
        const timeInSecondsNow = Math.floor(Date.now() / 1000).toString();
        newHospital.releases[0].timestamp = timeInSecondsNow;
        newHospital.live_db = timeInSecondsNow;
        newHospital.id = hospitalDoc.id;
        return hospitalDoc.update(newHospital);
      });
    })
  }

  /**
   * Update Hospital
   * @param {Hospital} updatedHospital
   * @returns {Promise<void>}
   */
  updateHospital(updatedHospital: Hospital): Promise<void> {
    const hospitalDoc = this.afs.doc(`/hospitals/${updatedHospital.id}`);
    return hospitalDoc.update(updatedHospital);
  }

  /**
   * Marks hospital as deleted, but doesn't really delete any data. See admin guide on how to free up the disk space
   * used by this hospital.
   * @param {Hospital} hospital to hospital to delete
   * @returns {Promise<void>}
   */
  deleteHospital(hospital: Hospital): Promise<void> {
    const hospitalDoc = this.afs.doc(`/hospitals/${hospital.id}`);
    hospital.deleted = true;
    return hospitalDoc.update(hospital);
  }

  /**
   * Initializes all ReplaySubjects
   */
  private subscribeAll() {

    /**
     * Subscribe to hospital
     * Load hospital data
     * Set hospital path
     */
    this.afs.doc<Hospital>(`/hospitals/${this.session.hospitalId}`).valueChanges().subscribe((hospital) => {
      this.hospital = hospital;
      this.basePath.next(this.getBasePath());
    });

    /**
     * Subscribe to hospital
     * Load hospital data
     * @type {AngularFirestoreCollection<Hospital>}
     */
    const hospitalCollection = this.afs.collection<Hospital>(`/hospitals`, query => {
      return query.where('deleted', '==', false);
    });
    this.hospitalsSubscription = hospitalCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const hospitalData = a.payload.doc.data() as Hospital;
        hospitalData.id = a.payload.doc.id;
        return hospitalData;
      });
    }).subscribe(this.hospitals);
  }

  /**
   * Get database path
   * @returns {string}
   */
  private getBasePath() {
    return `/hospitals/${this.hospital.id}/dbs/${this.getSelectedDb()}`;
  }

  /**
   * Get selected database
   * @returns {string}
   */
  private getSelectedDb() {
    return this.session.selectedDb === 'live' ? this.hospital.live_db : this.hospital.staging_db;
  }

  /**
   * Unsubscribe all subscription
   */
  private unsubscribeAll() {
    if (this.hospitalsSubscription)
      this.hospitalsSubscription.unsubscribe();
  }
}
