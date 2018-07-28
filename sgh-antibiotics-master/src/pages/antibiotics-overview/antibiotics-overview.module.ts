import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AntibioticsOverviewPage } from './antibiotics-overview';
import { AntibioticDetailsPageModule } from '../antibiotic-details/antibiotic-details.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AntibioticsOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(AntibioticsOverviewPage),
    AntibioticDetailsPageModule,
    PipesModule,
    ComponentsModule
  ],
})
export class AntibioticsOverviewPageModule {}
