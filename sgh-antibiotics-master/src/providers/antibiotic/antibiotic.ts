import { Injectable } from '@angular/core';
import { Session, SessionServiceProvider } from '../session-service/session-service';
import { HospitalProvider } from '../hospital/hospital';
import { Subscription } from 'rxjs/Subscription';
import { AntibioticGroup } from '../../entities/antibiotic-group';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Antibiotic } from '../../entities/antibiotic';
import { AdministrationInfo } from '../../entities/administration-info';
import { CopyUtil } from '../../entities/copy-util';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Provider for subscribing and managing Antibiotics, AntibioticGroups and
 * AdministrationInfos
 */
@Injectable()
export class AntibioticProvider {
  public session: Session;
  private _basePath: string = 'illegal';
  private antibioticsSubscription: Subscription;
  public antibiotics = new ReplaySubject<Antibiotic[]>(1);
  private antibioticGroupsSubscription: Subscription;
  public antibioticGroups = new ReplaySubject<AntibioticGroup[]>(1);

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

  private subscribeAll() {
    /* Subscribe to antibiotics and administrationInfo
     * Load antibiotics and administrationInfo data
     * Order by name
     */
    const antibioticsCollection = this.afs.collection<Antibiotic>(`${this.basePath}/antibiotics`,
      ref => ref.orderBy('name')
    );
    this.antibioticsSubscription = antibioticsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const antibioticData = a.payload.doc.data() as Antibiotic;
        antibioticData._id = a.payload.doc.id;
        antibioticData.administrationInfos = new ReplaySubject<AdministrationInfo[]>(1);
        this.afs.collection<AdministrationInfo>(`${this.basePath}/antibiotics/${antibioticData._id}/administrationInfos`)
          .snapshotChanges().map(adminActions => {
          return adminActions.map(action => {
            const adminInfo = action.payload.doc.data() as AdministrationInfo;
            adminInfo._id = action.payload.doc.id;
            return adminInfo;
          })
        }).subscribe(antibioticData.administrationInfos);
        return antibioticData;
      });
    }).subscribe(this.antibiotics);

    /* Subscribe to antibiotics groups
     * Load antibiotics groups data
     * Order by groupName
     */
    const antibioticGroupsCollection = this.afs.collection<AntibioticGroup>(`${this.basePath}/antibioticGroups`,
      ref => ref.orderBy('groupName'));
    this.antibioticGroupsSubscription = antibioticGroupsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const antibioticGroupData = a.payload.doc.data() as AntibioticGroup;
        antibioticGroupData._id = a.payload.doc.id;
        return antibioticGroupData;
      });
    }).subscribe(this.antibioticGroups);
  }

  private unsubscribeAll() {
    if (this.antibioticsSubscription)
      this.antibioticsSubscription.unsubscribe();
    if (this.antibioticGroupsSubscription)
      this.antibioticGroupsSubscription.unsubscribe();
  }

  /**
   * Update Antibiotic Group
   * @param {AntibioticGroup} antibioticGroup
   */
  updateAntibioticGroup(antibioticGroup: AntibioticGroup) {
    const antibioticGroupDoc = this.afs.doc(`${this.basePath}/antibioticGroups/${antibioticGroup._id}`);
    const data = CopyUtil.copy(antibioticGroup);
    antibioticGroupDoc.update(data).then(() => {
      console.log('Successfully updated: ', antibioticGroup.groupName);
    }).catch(err => {
      console.error('An error occurred while updating ', antibioticGroup.groupName + '. ', err);
    });
  }

  /**
   * Delete Antibiotic Group
   * @param {AntibioticGroup} antibioticGroup
   * @param {boolean} isCascadingDelete
   */
  deleteAntibioticGroup(antibioticGroup: AntibioticGroup, isCascadingDelete: boolean = false) {
    const antibioticGroupDoc = this.afs.doc(`${this.basePath}/antibioticGroups/${antibioticGroup._id}`);
    if (isCascadingDelete) {
      this.deleteAntibioticsByGroup(antibioticGroup._id);
    } else {
      this.moveAntibioticsToMiscellaneous(antibioticGroup._id);
    }
    antibioticGroupDoc.delete();
  }

  /**
   * Add new Antibiotic Group
   * @param {AntibioticGroup} newAntibioticGroup
   */
  addNewAntibioticGroup(newAntibioticGroup: AntibioticGroup) {
    const antibioticGroupCol = this.afs.collection(`${this.basePath}/antibioticGroups`);
    antibioticGroupCol.add(newAntibioticGroup).then(() => {
      console.log('Successfully added: ', newAntibioticGroup.groupName);
    }).catch(err => {
      console.error('An error occurred while adding ', newAntibioticGroup.groupName + '. ', err);
    });
  }

  /**
   * Delete Antibiotic by group
   * @param {string} antibioticGroupId
   */
  private deleteAntibioticsByGroup(antibioticGroupId: string) {
    const antibioticsCollection = this.afs.collection<Antibiotic>(
      `${this.basePath}/antibiotics`, query => query.where('groupId', '==', antibioticGroupId));
    antibioticsCollection.snapshotChanges().first().map(actions => {
      return actions.map(a => {
        a.payload.doc.ref.delete();
        const adminInfoCollection = this.afs.collection<AdministrationInfo>(`${a.payload.doc.ref.path}/administrationInfos`);
        return adminInfoCollection.ref.get().then(res => {
          return res.docs.map(doc => doc.ref.delete());
        }).catch(err => {
          console.error(err);
        });
      });
    }).subscribe();
  }

  /**
   * Add new Antibiotic
   * @param {Antibiotic} antibiotic
   */
  addNewAntibiotic(antibiotic: Antibiotic) {
    const antibioticDoc = this.afs.collection(`${this.basePath}/antibiotics/`);
    antibioticDoc.add(antibiotic).then(() => {
      console.log('Successfully added: ', antibiotic.name);
    }).catch(err => {
      console.error('An error occurred while adding ', antibiotic.name + '. ', err);
    });
  }

  /**
   * Update Antibiotic
   * @param {Antibiotic} antibiotic
   */
  updateAntibiotic(antibiotic: Antibiotic) {
    const antibioticDoc = this.afs.doc(`${this.basePath}/antibiotics/${antibiotic._id}`);
    const data = CopyUtil.copy(antibiotic);
    antibioticDoc.update(data).then(() => {
      console.log('Successfully updated: ', antibiotic.name);
    }).catch(err => {
      console.error('An error occurred while updating ', antibiotic.name + '. ', err);
    });
  }

  /**
   * Add new Administration Information
   * @param {AdministrationInfo} administrationInfo
   * @param {string} antibioticId
   */
  addNewAdministrationInfo(administrationInfo: AdministrationInfo, antibioticId: string) {
    const administrationInfoCol = this.afs.collection(`${this.basePath}/antibiotics/${antibioticId}/administrationInfos`);
    administrationInfoCol.add(administrationInfo).then(() => {
      console.log('Successfully added: ', administrationInfo.administration);
    }).catch(err => {
      console.error('An error occurred while adding ', administrationInfo.administration + '. ', err);
    });
  }

  /**
   * Deletes an antibiotic and all related administration informations.
   * @param {Antibiotic} antibiotic the antibiotic to delete
   * @returns {Promise<void>}
   */
  deleteAntibiotic(antibiotic: Antibiotic) {
    const antibioticDoc = this.afs.doc(`${this.basePath}/antibiotics/${antibiotic._id}`);
    const adminInfoCollection = this.afs.collection<AdministrationInfo>(antibioticDoc.ref.path + '/administrationInfos');
    return adminInfoCollection.ref.get().then(adminInfoDocs => {
      let adminInfoDeletions = [];
      for (let adminInfoDoc of adminInfoDocs.docs) {
        let adminInfo = (adminInfoDoc.data() as AdministrationInfo);
        adminInfo._id = adminInfoDoc.id;
        adminInfoDeletions.push(this.deleteAdministrationInfo(adminInfo, antibiotic._id));
      }
      return Promise.all(adminInfoDeletions).then(() => {
        return antibioticDoc.delete().then(() => {
          console.log('Successfully deleted antibiotic ', antibiotic.name);
        }).catch(err => {
          console.error('An error occurred while deleting an antibiotic.', err);
        });
      })
    })
  }

  /**
   * Move Antibiotic to Miscellaneous group
   * @param {string} antibioticGroupId groupId of antibiotics to move to miscellaneous.
   */
  private moveAntibioticsToMiscellaneous(antibioticGroupId: string) {
    let antibioticsCollection = this.afs.collection<Antibiotic>(
      `${this.basePath}/antibiotics`, query => query.where('groupId', '==', antibioticGroupId));
    antibioticsCollection.snapshotChanges().first().map(actions => {
      return actions.map(a => {
        const antibiotic = a.payload.doc.data() as Antibiotic;
        antibiotic.groupId = null;
        a.payload.doc.ref.update(antibiotic).then(() => {
          console.log('Successfully updated: ', antibiotic);
        }).catch(err => {
          console.error('An error occurred while updating ', antibiotic + '. ', err);
        });
      });
    }).subscribe();
  }

  /**
   * Deletes an admimistration information of an antibiotic.
   * @param {AdministrationInfo} administrationInfo the administration info to delete
   * @param {string} antibioticId the id of the related antibiotic
   * @returns {Promise<void>}
   */
  deleteAdministrationInfo(administrationInfo: AdministrationInfo, antibioticId: string) {
    const adminInfoDoc =
      this.afs.doc(`${this.basePath}/antibiotics/${antibioticId}/administrationInfos/${administrationInfo._id}`);
    return adminInfoDoc.delete().then(() => {
      console.log('Successfully deleted administration info ', administrationInfo.administration);
    }).catch(err => {
      console.error('An error occurred while deleting an administration info.', err);
    });
  }

  /**
   * Update Administration Information
   * @param {AdministrationInfo} administrationInfo
   * @param {string} antibioticId
   */
  updateAdministrationInfo(administrationInfo: AdministrationInfo, antibioticId: string) {
    const administrationInfoDoc =
      this.afs.doc(`${this.basePath}/antibiotics/${antibioticId}/administrationInfos/${administrationInfo._id}`);
    const data = CopyUtil.copy(administrationInfo);
    administrationInfoDoc.update(data).then(() => {
      console.log('Successfully updated: ', administrationInfo.administration);
    }).catch(err => {
      console.error('An error occurred while updating ', administrationInfo.administration + '. ', err);
    });
  }
}
