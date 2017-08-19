import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailUserPage } from './detail-user';

@NgModule({
  declarations: [
    DetailUserPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailUserPage),
  ],
})
export class DetailUserPageModule {}
