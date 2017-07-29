import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRegistroPage } from './new-registro';

@NgModule({
  declarations: [
    NewRegistroPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRegistroPage),
  ],
})
export class NewRegistroPageModule {}
