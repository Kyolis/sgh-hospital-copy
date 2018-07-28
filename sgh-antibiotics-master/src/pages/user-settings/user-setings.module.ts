import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSettingsPage } from './user-settings';
import { SessionServiceProvider } from '../../providers/session-service/session-service';

@NgModule({
  declarations: [
    UserSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSettingsPage),
  ],
  providers: [
    SessionServiceProvider
  ]
})
export class UserSettingsPageModule {}
