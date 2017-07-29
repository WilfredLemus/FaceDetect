import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { user } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-new-registro',
  templateUrl: 'new-registro.html',
})
export class NewRegistroPage {

  user: user = {
    username: '',
    email: '',
    image: ''
  }

  base64Image: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewRegistroPage');
  }

  TakePhoto() {
    const options: CameraOptions = {
      quality: 100,
      // destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
      }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      // this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.base64Image = imageData;
      }, (err) => {
      // Handle error
      console.error(err);
      });

  }

}
