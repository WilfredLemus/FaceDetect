import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioPage } from './usuario';

@NgModule({
  declarations: [
    UsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioPage),
  ],
})
export class UsuarioPageModule {}
