import { Component } from '@angular/core';

import { UsuarioPage } from '../usuario/usuario';
import { AnalisisPage } from './../analisis/analisis';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UsuarioPage;
  tab2Root = AnalisisPage;

  constructor() {

  }
}
