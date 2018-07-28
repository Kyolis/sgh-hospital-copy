import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserGuide } from '../../entities/user-guide';
import { AdminGuide } from '../../entities/admin-guide';
import { Observable } from 'rxjs/Observable';

/**
 * Subscribe and edit guide page data
 */
@Injectable()
export class GuideServiceProvider {
  private userGuideRef = this.afs.doc<UserGuide>(`/guides/user_guide`);
  private adminGuideRef = this.afs.doc<AdminGuide>(`/guides/admin_guide`);

  constructor(private afs: AngularFirestore) {
  }

  userGuide(): Observable<UserGuide> {
    return this.userGuideRef.valueChanges();
  }

  updateUserGuideText(text: string): Promise<void> {
    return this.userGuideRef.update({text: text});
  }

  adminGuide(): Observable<AdminGuide> {
    return this.adminGuideRef.valueChanges();
  }

  updateAdminGuideText(text: string): Promise<void> {
    return this.adminGuideRef.update({text: text});
  }
}

