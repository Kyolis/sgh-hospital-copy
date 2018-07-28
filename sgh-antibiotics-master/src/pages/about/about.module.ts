import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPage } from './about';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    ComponentsModule
  ],
  entryComponents: [AboutPage]
})
export class AboutPageModule {}
