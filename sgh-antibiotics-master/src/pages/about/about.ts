import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { EditTextSettings } from '../../components/edit-text/edit-text';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { AboutProvider } from '../../providers/about/about';
import { About } from '../../entities/about';

/**
 * Show general project information like disclaimer and such.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  editTextSettings: EditTextSettings = {
    showInfo: true,
    showShortcuts: true,
    showResetButton: false,
    showSaveButton: false,
    debounceTime: 500
  };

  session: Session;
  isEditView: boolean;
  about: About;

  constructor(private sessionService: SessionServiceProvider, private viewCtrl: ViewController,
              private aboutProvider: AboutProvider) {
    this.sessionService.state.subscribe((session) => {
      this.session = session;
      this.isEditView = session.isEditView;
    });
    this.aboutProvider.about().subscribe(about => this.about = about);
  }

  /**
   * To close the modal.
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  textChanged(text: string) {
    this.aboutProvider.updateAboutText(text);
  }
}
