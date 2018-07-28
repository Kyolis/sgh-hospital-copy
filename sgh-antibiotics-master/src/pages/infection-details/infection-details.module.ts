import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfectionDetailsPage } from './infection-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    InfectionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InfectionDetailsPage),
    ComponentsModule
  ],
})
export class InfectionDetailsPageModule {}
