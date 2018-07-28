import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonitoringParameters } from './monitoring-parameters';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MonitoringParameters,
  ],
  imports: [
    IonicPageModule.forChild(MonitoringParameters),
    ComponentsModule
  ],
})
export class MonitoringParametersPageModule {}
