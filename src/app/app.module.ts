import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { RegistroPage } from '../pages/registro/registro';
import { AnalisisPage } from '../pages/analisis/analisis';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import { RegistroProvider } from '../providers/registro/registro';
import { UploadfilesProvider } from '../providers/uploadfiles/uploadfiles';

@NgModule({
  declarations: [
    MyApp,
    RegistroPage,
    AnalisisPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RegistroPage,
    AnalisisPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    RegistroProvider,
    UploadfilesProvider
  ]
})
export class AppModule {}
