import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { config } from './app.config';

import { UsuarioPage } from '../pages/usuario/usuario';
import { AnalisisPage } from '../pages/analisis/analisis';
import { TabsPage } from '../pages/tabs/tabs';
import { NewUsuarioPage } from '../pages/new-usuario/new-usuario';
import { AddPhotoPage } from '../pages/add-photo/add-photo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { CameraPreview } from '@ionic-native/camera-preview'
import { Crop } from '@ionic-native/crop'
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { UploadfilesProvider } from '../providers/uploadfiles/uploadfiles';
import { UserProvider } from '../providers/user/user';
import { ApifaceProvider } from '../providers/apiface/apiface';

@NgModule({
  declarations: [
    MyApp,
    UsuarioPage,
    AnalisisPage,
    TabsPage,
    NewUsuarioPage,
    AddPhotoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config.firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UsuarioPage,
    AnalisisPage,
    TabsPage,
    NewUsuarioPage,
    AddPhotoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    CameraPreview,
    Crop,
    File,
    FileTransfer,
    UploadfilesProvider,
    UserProvider,
    ApifaceProvider
  ]
})
export class AppModule {}
