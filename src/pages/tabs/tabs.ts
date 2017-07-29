import { Component } from '@angular/core';

import { AnalisisPage } from './../analisis/analisis';
import { RegistroPage } from './../registro/registro';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RegistroPage;
  tab2Root = AnalisisPage;

  constructor() {

  }
}
