import { Injectable } from '@angular/core';
import { Session, SessionServiceProvider } from '../session-service/session-service';
import { AngularFirestore } from 'angularfire2/firestore';
import { HospitalProvider } from '../hospital/hospital';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Infection } from '../../entities/infection';
import { InfectionCategory } from '../../entities/infection-category';
import { Condition } from '../../entities/condition';
import { Subscription } from 'rxjs/Subscription';
import { Treatment } from '../../entities/treatment';
import { CopyUtil } from '../../entities/copy-util';

/*
  Generated class for the InfectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InfectionProvider {
  private session: Session;
  public infections = new ReplaySubject<Infection[]>(1);
  public infectionCategories = new ReplaySubject<InfectionCategory[]>(1);
  private _basePath: string = 'illegal';
  private categoriesSubscription: Subscription;
  private infectionsSubscription: Subscription;

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
      this.subscribeToInfections();
    }
  }

  private subscribeToInfections() {
    this.categoriesSubscription = this.afs.collection(`${this.basePath}/infectionCategories`, ref => ref.orderBy('name')).snapshotChanges().map(actions => {
      return actions.map(action => {
        const categoryData = action.payload.doc.data() as InfectionCategory;
        categoryData._id = action.payload.doc.id;
        return categoryData;
      })
    }).subscribe(this.infectionCategories);
    this.infectionsSubscription = this.afs.collection(`${this.basePath}/infections`, ref => ref.orderBy('name')).snapshotChanges().map(actions => {
      return actions.map(action => {
        const infectionData = action.payload.doc.data() as Infection;
        infectionData._id = action.payload.doc.id;
        infectionData.conditions = new ReplaySubject<Condition[]>(1);
        const conditionsColPath = `${action.payload.doc.ref.path}/conditions`;
        this.afs.collection(conditionsColPath).snapshotChanges().map(actions => {
          return actions.map(action => {
            const conditionData = action.payload.doc.data() as Condition;
            conditionData._id = action.payload.doc.id;
            conditionData.treatments = new ReplaySubject<Treatment[]>(1);
            const treatmentColPath = `${action.payload.doc.ref.path}/treatments`;
            this.afs.collection(treatmentColPath).snapshotChanges().map(actions => {
              return actions.map(action => {
                const treatmentData = action.payload.doc.data() as Treatment;
                treatmentData._id = action.payload.doc.id;
                return treatmentData;
              });
            }).subscribe(conditionData.treatments);
            return conditionData;
          });
        }).subscribe(infectionData.conditions);
        return infectionData;
      })
    }).subscribe(this.infections);
  }

  /**
   * Add Infection
   * @param {Infection} infection
   */
  public addInfection(infection: Infection) {
    const infectionsDoc = this.afs.collection(`${this.basePath}/infections/`);
    infectionsDoc.add(infection).then(() => {
      console.log('Successfully added: ', infection.name);
    }).catch(err => {
      console.error('An error occurred while adding ', infection.name + '. ', err);
    });
  }

  /**
   * Add Infection Category
   * @param {InfectionCategory} category
   */
  public addInfectionCategory(category: InfectionCategory) {
    const categoriesCollection = this.afs.collection(`${this.basePath}/infectionCategories/`);
    categoriesCollection.add(category).then(() => {
      console.log('Successfully added: ', category.name);
    }).catch(err => {
      console.error('An error occurred while adding ', category.name + '. ', err);
    });
  }

  /**
   * Delete Infection
   * @param {Infection} infection
   */
  public deleteInfection(infection: Infection) {
    const infectionDoc = this.afs.doc(`${this.basePath}/infections/${infection._id}`);
    const conditionCollection = this.afs.collection<Condition>(infectionDoc.ref.path + '/conditions');
    return conditionCollection.ref.get().then(conditionDocs => {
      let conditionDeletions = [];
      for (let conditionDoc of conditionDocs.docs) {
        let condition = (conditionDoc.data() as Condition);
        condition._id = conditionDoc.id;
        conditionDeletions.push(this.deleteCondition(condition, infection._id));
      }
      return Promise.all(conditionDeletions).then(() => {
        return infectionDoc.delete().then(() => {
          console.log('Successfully deleted infection ', infection.name);
        });
      });
    }).catch(err => {
      console.error('An error occurred while deleting an infection.', err);
    });
  }

  public deleteCondition(condition: Condition, infectionId: string) {
    const conditionDoc = this.afs.doc(
      `${this.basePath}/infections/${infectionId}/conditions/${condition._id}`);
    const treatmentCollection = this.afs.collection<Treatment>(conditionDoc.ref.path + '/treatments');
    return treatmentCollection.ref.get().then(treatmentDocs => {
      let treatmentDeletions = [];
      for (let treatmentDoc of treatmentDocs.docs) {
        let treatment = (treatmentDoc.data() as Treatment);
        treatment._id = treatmentDoc.id;
        treatmentDeletions.push(this.deleteTreatment(treatment, condition._id, infectionId));
      }
      return Promise.all(treatmentDeletions).then(() => {
        return conditionDoc.delete().then(() => {
          console.log('Successfully deleted condition ', condition.name);
        });
      });
    }).catch(err => {
      console.error('An error occurred while deleting a condition.', err);
    });
  }

  deleteTreatment(treatment: Treatment, conditionId: string, infectionId: string) {
    const treatmentDoc = this.afs.doc(
      `${this.basePath}/infections/${infectionId}/conditions/${conditionId}/treatments/${treatment._id}`);
    return treatmentDoc.delete().then(() => {
      console.log('Successfully deleted treatment ', treatment.header);
    }).catch(err => {
      console.error('An error occurred while deleting a treatment.', err);
    });
  }

  /**
   * Update Infection
   * @param {Infection} infection
   */
  updateInfection(infection: Infection) {
    const infectionDoc =
      this.afs.doc(`${this.basePath}/infections/${infection._id}`);
    const data = CopyUtil.copy(infection);
    infectionDoc.update(data).then(() => {
      console.log('Successfully updated: ', infection.name);
    }).catch(err => {
      console.error('An error occurred while updating ', infection.name + '. ', err);
    });
  }

  /**
   * Update Infection Category
   * @param {InfectionCategory} infectionCategory
   */
  updateInfectionCategory(infectionCategory: InfectionCategory) {
    const infectionCategoryDoc =
      this.afs.doc(`${this.basePath}/infectionCategories/${infectionCategory._id}`);
    const data = CopyUtil.copy(infectionCategory);
    infectionCategoryDoc.update(data).then(() => {
      console.log('Successfully updated: ', infectionCategory.name);
    }).catch(err => {
      console.error('An error occurred while updating ', infectionCategory.name + '. ', err);
    });
  }

  /**
   * Delete Infection Category
   * @param {InfectionCategory} infectionCategory
   * @param {boolean} cascadingDelete
   */
  deleteInfectionCategory(infectionCategory: InfectionCategory, cascadingDelete: boolean) {
    const infectionCategoryDoc = this.afs.doc(`${this.basePath}/infectionCategories/${infectionCategory._id}`);
    infectionCategoryDoc.delete().then(() => {
      console.log('Successfully deleted infectionCategory ' + infectionCategory._id + ".");
      if (cascadingDelete) {
        return this.deleteInfectionsByCategory(infectionCategory._id);
      } else {
        return this.moveInfectionsToMiscellaneous(infectionCategory._id);
      }
    }).catch(error => {
      console.error('An error occurred while deleting the infectionCategory ' + infectionCategory._id + '. ', error);
    });
  }

  /**
   * Add new condition to infection
   * @param {Condition} condition
   * @param {string} infectionId
   */
  addNewCondition(condition: Condition, infectionId: string) {
    const conditionCol = this.afs.collection(`${this.basePath}/infections/${infectionId}/conditions`);
    conditionCol.add(condition).then(() => {
      console.log('Successfully added: ', condition.name);
    }).catch(err => {
      console.error('An error occurred while adding ', condition.name + '. ', err);
    });
  }

  /**
   * Update condition
   * @param {Condition} condition
   * @param {string} infectionId
   */
  updateCondition(condition: Condition, infectionId: string) {
    const conditionDoc =
      this.afs.doc(`${this.basePath}/infections/${infectionId}/conditions/${condition._id}`);
    const data = CopyUtil.copy(condition);
    conditionDoc.update(data).then(() => {
      console.log('Successfully updated: ', condition.name);
    }).catch(err => {
      console.error('An error occurred while updating ', condition.name + '. ', err);
    });
  }

  addNewTreatment(treament: Treatment, conditionId: string, infectionId: string) {
    const treatmentCol = this.afs.collection(`${this.basePath}/infections/${infectionId}/conditions/${conditionId}/treatments`);
    treatmentCol.add(treament).then(() => {
      console.log('Successfully added: ', treament.header);
    }).catch(err => {
      console.error('An error occurred while adding ', treament.header + '. ', err);
    });
  }

  updateTreatment(treatment: Treatment, conditionId: string, infectionId: string) {
    const treatmentDoc =
      this.afs.doc(`${this.basePath}/infections/${infectionId}/conditions/${conditionId}/treatments/${treatment._id}`);
    const data = CopyUtil.copy(treatment);
    treatmentDoc.update(data).then(() => {
      console.log('Successfully updated treatment: ', treatment.header);
    }).catch(err => {
      console.error('An error occurred while updating treatment', treatment.header + '. ', err);
    });
  }


  /**
   * Returns a treatment including the options on its path.
   * @param {string} infectionId    ID of infection
   * @param {string} conditionId    ID of condition
   * @param {string} treatmentId    ID of treatment
   * @returns {Promise<{infection: Infection; condition: Condition; treatment: Treatment}>}
   */
  getReferenceByIds(infectionId: string, conditionId: string, treatmentId: string):
  Promise<{infection: Infection, condition: Condition, treatment: Treatment}> {
    let reference = {infection: null, condition: null, treatment: null};
    return new Promise((resolve, reject) => {
      return this.infections.subscribe(infections => {
          let infection = infections.find(infection => infection._id === infectionId);
          reference.infection = infection;
          return infection.conditions.subscribe(conditions => {
            let condition = conditions.find(condition => condition._id === conditionId);
            reference.condition = condition;
            return condition.treatments.subscribe(treatments => {
              reference.treatment = treatments.find(treatment => treatment._id === treatmentId);
              return resolve(reference);
            })
          });
        },
        reject);
    });
  }

  private deleteInfectionsByCategory(infectionCategoryId: string) {
    const infectionCategoryCollection = this.afs.collection<Infection>(
      `${this.basePath}/infections`, query => query.where('categoryId', '==', infectionCategoryId));
    infectionCategoryCollection.snapshotChanges().first().map(actions => {
      return actions.map(a => {
        let infection = a.payload.doc.data() as Infection;
        infection._id = a.payload.doc.id;
        this.deleteInfection(infection);
      });
    }).subscribe();
  }

  /**
   * Move Infections to Msicellaneous
   * @param {string} categoryId
   */
  private moveInfectionsToMiscellaneous(categoryId: string) {
    let infectionsCollection = this.afs.collection<Infection>(
      `${this.basePath}/infections`, query => query.where('categoryId', '==', categoryId));
    infectionsCollection.snapshotChanges().first().map(actions => {
      return actions.map(a => {
        const infection = a.payload.doc.data() as Infection;
        infection.categoryId = null;
        a.payload.doc.ref.update(infection).then(() => {
          console.log('Successfully updated: ', infection);
        }).catch(err => {
          console.error('An error occurred while updating ', infection + '. ', err);
        });
      });
    }).subscribe();
  }

  /**
   * Unsubscribe all subscriptions
   */
  private unsubscribeAllSubscriptions() {
    if (this.infectionsSubscription)
      this.infectionsSubscription.unsubscribe();
    if (this.categoriesSubscription)
      this.categoriesSubscription.unsubscribe();
  }
}


