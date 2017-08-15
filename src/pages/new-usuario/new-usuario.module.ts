import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewUsuarioPage } from './new-usuario';

@NgModule({
  declarations: [
    NewUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(NewUsuarioPage),
  ],
})
export class NewUsuarioPageModule {}
