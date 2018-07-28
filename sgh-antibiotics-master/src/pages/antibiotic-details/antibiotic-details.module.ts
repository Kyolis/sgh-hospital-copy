import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AntibioticDetailsPage } from './antibiotic-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AntibioticDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(AntibioticDetailsPage),
    ComponentsModule
  ],
})
export class AntibioticDetailsPageModule {}
