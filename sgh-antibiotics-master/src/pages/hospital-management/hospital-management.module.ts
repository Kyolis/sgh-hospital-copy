import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalManagementPage } from './hospital-management';
import { PipesModule } from '../../pipes/pipes.module';
import { HospitalProvider } from '../../providers/hospital/hospital';

@NgModule({
  declarations: [
    HospitalManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalManagementPage),
    PipesModule,
  ],
  providers: [
    HospitalProvider,
  ]
})
export class HospitalManagementPageModule {}
