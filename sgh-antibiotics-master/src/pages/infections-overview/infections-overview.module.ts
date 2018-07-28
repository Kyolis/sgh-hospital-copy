import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfectionsOverviewPage } from './infections-overview';
import { PipesModule } from '../../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { InfectionDetailsPageModule } from '../infection-details/infection-details.module';

@NgModule({
  declarations: [
    InfectionsOverviewPage,
  ],
  imports: [
    IonicPageModule.forChild(InfectionsOverviewPage),
    InfectionDetailsPageModule,
    PipesModule,
    CommonModule,
    ComponentsModule
  ],
})
export class InfectionsOverviewPageModule {}
