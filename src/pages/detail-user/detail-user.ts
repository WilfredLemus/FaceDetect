import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userProvider: UserProvider,) {
    this.keyUser = this.navParams.get('keyUser');
    this.userProvider.getUser(this.keyUser)
      .subscribe(user => {
        this.user = user;
      });
  }

  ionViewDidLoad() {

  }

}
