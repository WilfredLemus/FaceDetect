import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddPhotoPage } from './add-photo';

@NgModule({
  declarations: [
    AddPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddPhotoPage),
  ],
})
export class AddPhotoPageModule {}
