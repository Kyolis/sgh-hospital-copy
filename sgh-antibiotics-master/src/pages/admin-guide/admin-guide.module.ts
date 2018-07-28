import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminGuidePage } from './admin-guide';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdminGuidePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminGuidePage),
    ComponentsModule
  ],
  entryComponents: [AdminGuidePage]
})
export class AdminGuidePageModule {}
