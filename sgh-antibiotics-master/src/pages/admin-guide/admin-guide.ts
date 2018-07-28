import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { EditTextSettings } from '../../components/edit-text/edit-text';
import { Session, SessionServiceProvider } from '../../providers/session-service/session-service';
import { GuideServiceProvider } from '../../providers/guide-service/guide-service';
import { AdminGuide } from '../../entities/admin-guide';


/**
 * The admin guide UI
 */
@IonicPage()
@Component({
  selector: 'page-admin-guide',
  templateUrl: 'admin-guide.html',
})
export class AdminGuidePage {
  editTextSettings: EditTextSettings = {
    showInfo: true,
    showShortcuts: true,
    showResetButton: false,
    showSaveButton: false,
    debounceTime: 500
  };

  session: Session;
  isEditView: boolean;
  adminGuide: AdminGuide;

  constructor(private sessionService: SessionServiceProvider, private viewCtrl: ViewController,
              private adminGuideProvider: GuideServiceProvider) {
    this.sessionService.state.subscribe((session) => {
      this.session = session;
      this.isEditView = session.isEditView;
    });
    this.adminGuideProvider.adminGuide().subscribe(adminGuide => this.adminGuide = adminGuide);
  }

  /**
   * To close the modal.
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  textChanged(text: string) {
    this.adminGuideProvider.updateAdminGuideText(text);
  }
}
