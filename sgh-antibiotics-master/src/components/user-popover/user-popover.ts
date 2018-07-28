import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { SessionServiceProvider } from '../../providers/session-service/session-service';

/**
 * Show a Popover for User actions like logout, settings, etc.
 */
@Component({
  selector: 'user-popover',
  templateUrl: 'user-popover.html'
})
export class UserPopoverComponent {
  constructor(public viewCtrl: ViewController, private sessionProvider: SessionServiceProvider) {}

  /**
   * Back to setup page.
   * @returns {Promise<any>}
   */
  close() {
    return this.viewCtrl.dismiss();
  }

  /**
   * Logout from the session.
   */
  logout() {
    this.close().then(() => {
      this.sessionProvider.logout();
    });
  }
}
