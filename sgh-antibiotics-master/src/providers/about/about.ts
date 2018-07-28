import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { About } from '../../entities/about';
import { Observable } from 'rxjs/Observable';

/**
 * Subscribe and edit about page data.
 */
@Injectable()
export class AboutProvider {
  private aboutRef = this.afs.doc<About>(`/about/aboutPage`);

  constructor(private afs: AngularFirestore) {
  }

  about(): Observable<About> {
    return this.aboutRef.valueChanges();
  }

  updateAboutText(text: string): Promise<void> {
    return this.aboutRef.update({text: text});
  }
}
