import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { UserProvider } from '../../providers/user/user';
import { UploadfilesProvider } from '../../providers/uploadfiles/uploadfiles';
import { ApifaceProvider } from './../../providers/apiface/apiface';

import { DetailUserPage } from './../detail-user/detail-user';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-verificar-rostro',
  templateUrl: 'verificar-rostro.html',
})
export class VerificarRostroPage {

  keyUser: string;
  user: any;
  Access;
  analizado: boolean = false;
  newIMG: any;
  base64: any;
  loading = this.loadingCtrl.create({
      content: 'Analizando...'
    });

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public loadingCtrl: LoadingController,
              private camera: Camera,
              private crop: Crop,
              private userProvider: UserProvider,
              private uploadService: UploadfilesProvider,
              private apiFace: ApifaceProvider) {

    this.keyUser = this.navParams.get('keyUser');
    this.userProvider.getUser(this.keyUser)
      .subscribe(user => {
        this.user = user;
      });
  }

  ionViewDidLoad() {
    this.TakePhoto();
  }


  TakePhoto() {
    const options: CameraOptions = {
        quality: 75,
        sourceType: this.camera.PictureSourceType.CAMERA,
        // destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        cameraDirection: this.camera.Direction.FRONT,
        correctOrientation: true
      }

    this.camera.getPicture(options).then((imageData) => {
        this.CropPhoto(imageData);
      }, (err) => {
        console.error(err);
      });
  }

  CropPhoto(photo: string) {
    this.crop.crop(photo, {quality: 100}).then(
      (cropImage) => {
        this.newIMG = cropImage;
        console.log(this.newIMG);
        this.loading.present();
        this.SavePhoto()
      }, (err) => {
        console.log(err);
      });
  }

  SavePhoto() {
    this.getFileContentAsBase64(this.newIMG, (base64Image) => {
      this.base64 = base64Image;
      this.uploadService.processUploadtoCompare(this.user.$key, base64Image, "ANALYZE" + this.user.username + new Date())
        .then((verifyData) => {
          this.verifyImages(verifyData[1]);
        })
        .catch(err => {
          this.loading.dismiss();
          console.log(err);
        });
    });
  }


  verifyImages(dataVerify) {
    this.apiFace.getVerifyImgs(this.user.FaceApi.faceId, dataVerify.FaceApi.faceId)
      .subscribe(verify => {
        let verifyImgs = verify.json();
        this.Access = verifyImgs.isIdentical;
        this.analizado = true;
        if(this.Access || !this.Access) {
          setTimeout(() => {
            this.navCtrl.push(DetailUserPage, { keyUser: this.keyUser, verifyState: this.Access })
              .then(() => {
                const index = this.viewCtrl.index;
                this.navCtrl.remove(index);
              });
          }, 4000)
        }
      });

    this.loading.dismiss();

  }


  getFileContentAsBase64(path, callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);

    function fail(e) {
          alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
      fileEntry.file(function(file) {
          var reader = new FileReader();
          reader.onloadend = function(e) {
              var content = this.result;
              callback(content);
          };
          reader.readAsDataURL(file);
      });
    }
  }



}
