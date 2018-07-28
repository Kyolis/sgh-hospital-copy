import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserGuidePage } from './user-guide';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    UserGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(UserGuidePage),
    ComponentsModule
  ],
  entryComponents: [UserGuidePage]
})
export class UserGuidePageModule {}
