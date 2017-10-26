import { VerificarRostroPage } from './../verificar-rostro/verificar-rostro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserData } from '../../models/user';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-detail-user',
  templateUrl: 'detail-user.html',
})
export class DetailUserPage {
  keyUser: string;
  user: UserData;
  verifyState: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private userProvider: UserProvider,) {
    this.keyUser = this.navParams.get('keyUser');
    this.verifyState = this.navParams.get('verifyState');
    this.userProvider.getUser(this.keyUser)
      .subscribe(user => {
        this.user = user;
      });
  }

  verifyFace() {
    this.navCtrl.push(VerificarRostroPage, { keyUser: this.keyUser })
    .then(() => {
      const index = this.viewCtrl.index;
      this.navCtrl.remove(index);
    });
  }

}
