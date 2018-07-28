import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserManagementPage } from './user-management';
import { UserDetailsPageModule } from '../user-details/user-details.module';
import { PipesModule } from '../../pipes/pipes.module';
import { UserServiceProvider } from '../../providers/user-service/user-service';

@NgModule({
  declarations: [
    UserManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(UserManagementPage),
    UserDetailsPageModule,
    PipesModule
  ],
  providers: [
    UserServiceProvider
  ]
})
export class UserManagementPageModule {}
