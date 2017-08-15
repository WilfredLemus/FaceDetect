import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
// import { Upload } from './../interfaces/upload';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import firebase from 'firebase';
// import { Upload } from '../../models/upload';
import { UserProvider } from '../user/user';
import { ApifaceProvider } from './../apiface/apiface';


@Injectable()
export class UploadfilesProvider {

  private basePath: string = '/ImgUsers';

  
  constructor(private afDB: AngularFireDatabase, 
              private userProvider: UserProvider, 
              private apiFace: ApifaceProvider) { }


  // Proceso de carga, apiFace y guardar en db
  processUpload(userKey, uploadFile, nameFile) {
    let urlImg: any;
    let pushUpload = this.pushUpload(uploadFile, nameFile);

    let updateUserFile = pushUpload.then((urlFile) => {
      urlImg = urlFile
      console.log("UrlFile: " + urlImg)
      this.updateUserFile(userKey, urlImg);
    })

    // let apiFace = updateUserFile.then(() => {
    //   console.log("urlIMG: " + urlImg);
    // })

    updateUserFile.then(() => {
      this.apiFaceImg(urlImg)
        .then(dataFace => {
          console.log("DataFace: " + dataFace)
          this.updateUserFace(userKey, dataFace);
        })
    })

    // let updateUseFace = apiFace.then((dataFace) => {
    //   console.log("DataFace: " + dataFace)
    //   this.updateUserFace(userKey, dataFace);
    // })

    return Promise.all([pushUpload, updateUserFile])
  }

  // Se sube el archivo en firebase storage
  private pushUpload(uploadFile, nameFile){
    console.log("Subiendo imagen");
    return new Promise((resolve, reject) => {

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child(`${this.basePath}/${nameFile}.jpg`).putString(uploadFile, firebase.storage.StringFormat.DATA_URL);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // Progreso de la carga del archivo
          var snapshotRef = snapshot as firebase.storage.UploadTaskSnapshot;
          var bytesTransferred = (snapshotRef).bytesTransferred;
          var totalBytes = (snapshotRef).totalBytes;
          console.log("PROGRESO: " + (bytesTransferred / totalBytes) * 100);
          // upload.progress = (bytesTransferred / totalBytes) * 100;
        },
        (error) => {
          console.log("ERROR: " + error);
          reject(error);
        },
        () => {
          // Carga de archivo terminada correctamente
          let urlFile: string = uploadTask.snapshot.downloadURL;
          // upload.imagenURL = uploadTask.snapshot.downloadURL;
          // this.saveFileData(upload);
          resolve(urlFile);
          return undefined;
        })
      });
  }

  // Se guarda la informacion del archivo subido
  private updateUserFile(userKey, urlFile) {
    console.log("Guardado String Imagen");
    return new Promise((resolve, reject) => {
      this.userProvider.updateUser(userKey, {imagenURL: urlFile})
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    })
  }

  // Se realiza la peticion a Service Congnitive FaceApi
  private apiFaceImg(urlFile) {
    let dataFace: any;
    // console.log("Obteniendo ApiFace");
    // this.apiFace.getDataImg(urlFile)
    //   .map(data => {
    //     dataFace = data;
    //   })
    //   .toPromise()
    //   .then(data => {
    //     dataFace = data;        
    //   });

    // return dataFace;
    return new Promise((resolve, reject) => {
      this.apiFace.getDataImg(urlFile)
        .subscribe(
        (data) => {
          dataFace = data;
          console.log(dataFace[0]);
        }, 
        err => {
          console.log(err);
          reject(err)
        },
        () => {
          console.log("FINALIZO");
          // this.personData = JSON.stringify(this.personData);
          // console.log(personData[0]);
          console.log("DATA: " + dataFace[0])
          resolve(dataFace[0]);
        });
    })
  }

  private updateUserFace(userKey, dataFace){
    console.log("Guardado ApiFace");
    return new Promise((resolve, reject) => {
      this.userProvider.updateUser(userKey, {FaceApi: dataFace})
        .then(() => {
          resolve();
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    })
  }

}
