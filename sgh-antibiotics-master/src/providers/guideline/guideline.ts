import { Injectable } from '@angular/core';
import { Session, SessionServiceProvider } from '../session-service/session-service';
import { HospitalProvider } from '../hospital/hospital';
import { AngularFirestore } from 'angularfire2/firestore';
import { Guideline } from '../../entities/guideline';
import { Subscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { CopyUtil } from '../../entities/copy-util';

/**
 * Provider for subscribing and managing Guideline data.
 */
@Injectable()
export class GuidelineProvider {
  public session: Session;
  private _basePath: string;
  private guidelinesSubscription: Subscription;
  public guidelines = new ReplaySubject<Guideline[]>(1);

  constructor(private sessionService: SessionServiceProvider,
              private hospitalProvider: HospitalProvider, private afs: AngularFirestore) {
    this.sessionService.state.subscribe(session => {
      this.session = session;
      if (session.loggedIn) {
        this.hospitalProvider.basePath.subscribe(basePath => {
          this.basePath = basePath;
        });
      } else {
        this.unsubscribeAll();
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
      this.unsubscribeAll();
    } else {
      this.subscribeAll();
    }
  }

  /**
   * Update Guideline
   * @param {Guideline} guideline
   */
  updateGuideline(guideline: Guideline) {
    const guidelineDoc = this.afs.doc(`${this.basePath}/guidelines/${guideline._id}`);
    const data = CopyUtil.copy(guideline);
    guidelineDoc.update(data).then(() => {
      console.log('Successfully updated: ', guideline.name);
    }).catch(err => {
      console.error('An error occurred while updating ', guideline.name + '. ', err);
    });
  }

  /**
   * Delete Guideline
   * @param {Guideline} guideline
   */
  deleteGuideline(guideline: Guideline) {
    const guidelineDoc = this.afs.doc(`${this.basePath}/guidelines/${guideline._id}`);
    guidelineDoc.delete().then(() => {
      console.log('Successfully deleted guideline ' + guideline._id + ".");
    }).catch(error => {
      console.error('An error occurred while deleting the guidline ' + guideline._id + '. ', error);
    });
  }

  /**
   * Add new Guideline
   * @param {Guideline} newGuideline
   */
  addNewGuideline(newGuideline: Guideline) {
    const guidelineCol = this.afs.collection(`${this.basePath}/guidelines`);
    guidelineCol.add(newGuideline).then(() => {
      console.log('Successfully added: ', newGuideline.name);
    }).catch(err => {
      console.error('An error occurred while adding ', newGuideline.name + '. ', err);
    });
  }

  private subscribeAll() {

     /* Subscribe to guidelines
     * Load guidelines data
     */
    const guidelinesCollection = this.afs.collection<Guideline>(`${this.basePath}/guidelines`);
    this.guidelinesSubscription = guidelinesCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const guidelineData = a.payload.doc.data() as Guideline;
        guidelineData._id = a.payload.doc.id;
        return guidelineData;
      });
    }).subscribe(this.guidelines);
  }

  private unsubscribeAll() {
    if (this.guidelinesSubscription)
      this.guidelinesSubscription.unsubscribe();
  }
}
