import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HospitalDetailsPage } from './hospital-details';

@NgModule({
  declarations: [
    HospitalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HospitalDetailsPage),
  ],
})
export class HospitalDetailsPageModule {}
