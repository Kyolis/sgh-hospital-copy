import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuidelinesDetailsPage } from './guidelines-details';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GuidelinesDetailsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GuidelinesDetailsPage),
  ],
})
export class GuidelinesDetailsPageModule {}
