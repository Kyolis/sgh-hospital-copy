import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdverseReactionsPage } from './adverse-reactions';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AdverseReactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdverseReactionsPage),
    ComponentsModule
  ],
})
export class AdverseReactionsPageModule {}
