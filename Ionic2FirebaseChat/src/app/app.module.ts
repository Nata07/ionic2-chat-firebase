import { LazyPage } from './../pages/lazy/lazy';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {AngularFireModule, FirebaseAppConfig} from 'angularfire2';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyBZjiSVID8ANk1hantGP5PJCsl_lPSaxUA",
    authDomain: "ionic2-firebase-chat-3e633.firebaseapp.com",
    databaseURL: "https://ionic2-firebase-chat-3e633.firebaseio.com",
    storageBucket: "ionic2-firebase-chat-3e633.appspot.com",
    messagingSenderId: "418527449405"
  };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LazyPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LazyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}