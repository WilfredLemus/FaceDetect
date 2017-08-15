import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// import { FirebaseObjectObservable} from 'angularfire2/database';
import { Camera, CameraOptions } from '@ionic-native/camera';
// import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Crop } from '@ionic-native/crop';
import { UserData } from '../../models/user';
import { Upload } from '../../models/upload';
import { UserProvider } from '../../providers/user/user';
import { UploadfilesProvider } from '../../providers/uploadfiles/uploadfiles';
import { ApifaceProvider } from '../../providers/apiface/apiface';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-add-photo',
  templateUrl: 'add-photo.html',
})
export class AddPhotoPage {
  keyUser: string;
  user: UserData;
  srcImage: any;
  blobimg: any;
  UploadFile: Upload;
  fileTransfer: FileTransferObject;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private camera: Camera,
              // private cameraPreview: CameraPreview,
              private crop: Crop,
              private transfer: FileTransfer, 
              private file: File,
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
    // console.log('ionViewDidLoad AddPhotoPage');
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
        this.srcImage = cropImage;
      }, (err) => {
        console.log(err);
      });
  }

  SavePhoto() {
    let loading = this.loadingCtrl.create({
      content: 'Porfavor espere...'
    });

    loading.present();
    this.getFileContentAsBase64(this.srcImage, (base64Image) => {

      this.uploadService.processUpload(this.user.$key, base64Image, this.user.username + new Date())
        .then(() => {
          loading.dismiss();
          this.showAlert('Imagen Cargada!', 'La imagen se cargo correctamente.', true);
        })
        .catch(err => {
          loading.dismiss();
          this.showAlert('Error al cargar la imagen!', err, false);
        });

      // this.UploadFile = new Upload();
      // this.UploadFile.Sfile = base64Image;
      // this.UploadFile.$key = this.user.$key;
      // this.UploadFile.name = this.user.username + new Date();
      // this.uploadService.pushUpload(this.UploadFile)
      //   .then((imageUrl) => {
      //     loading.dismiss();
      //     let personData: any;
      //     this.apiFace.getDataImg(imageUrl)
      //       .subscribe(data => {
      //         personData = data
      //       }, erro => console.log(erro),
      //       () => {
      //         console.log("FINALIZO");
      //         // this.personData = JSON.stringify(this.personData);
      //         console.log(personData[0]);
      //       });
      //     // this.showAlert('Cargada!', 'La imagen se cargo correctamente.');
      //   })
      //   .catch(err => {
      //     loading.dismiss();
      //     this.showAlert('Error al cargar la imagen!', err);
      //   })
    });
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
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
      }
  }


  showAlert(title, subtitle, action) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if(action){
              this.navCtrl.popAll();
            }
          }
        }
      ]
    });
    alert.present();
  }


}
