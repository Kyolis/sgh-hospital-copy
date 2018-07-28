import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { EditTextSettings } from '../../components/edit-text/edit-text';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { GuideServiceProvider } from '../../providers/guide-service/guide-service';
import { UserGuide } from '../../entities/user-guide';


/**
 * The user guide UI
 */
@IonicPage()
@Component({
  selector: 'page-user-guide',
  templateUrl: 'user-guide.html',
})
export class UserGuidePage {
  editTextSettings: EditTextSettings = {
    showInfo: true,
    showShortcuts: true,
    showResetButton: false,
    showSaveButton: false,
    debounceTime: 500
  };

  session: Session;
  isEditView: boolean;
  userGuide: UserGuide;

  constructor(private sessionService: SessionServiceProvider, private viewCtrl: ViewController,
              private userGuideProvider: GuideServiceProvider) {
    this.sessionService.state.subscribe((session) => {
      this.session = session;
      this.isEditView = session.isEditView;
    });
    this.userGuideProvider.userGuide().subscribe(userGuide => this.userGuide = userGuide);
  }

  /**
   * To close the modal.
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  textChanged(text: string) {
    this.userGuideProvider.updateUserGuideText(text);
  }
}
