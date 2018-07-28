import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MarkdownModalInfoPage } from './markdown-modal-info';

@NgModule({
  declarations: [
    MarkdownModalInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MarkdownModalInfoPage),
  ],
})
export class MarkdownModalInfoPageModule {}
