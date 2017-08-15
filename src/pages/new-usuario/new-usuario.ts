import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AddPhotoPage } from '../add-photo/add-photo';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UserData } from '../../models/user';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-new-usuario',
  templateUrl: 'new-usuario.html',
})
export class NewUsuarioPage {

  NewUser: UserData = new UserData();

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private camera: Camera,
              private userProvider: UserProvider) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewRegistroPage');
  }

  saveUser() {
    let keyUser: string;
    keyUser = this.userProvider.createUser(this.NewUser);
      // .then(user => {
      //   keyUser = user.key;
      //   console.log(user);
      // });
    console.log(keyUser);
    this.showToast('Usuario Creado', 'top');
    // Add page upload image
    this.navCtrl.push(AddPhotoPage, { keyUser: keyUser })
  }


  showToast(message: string, position: string){
    let toast = this.toastCtrl.create({
        message: message,
        duration: 3000,
        position: position
      });
    toast.present();
  }


}
