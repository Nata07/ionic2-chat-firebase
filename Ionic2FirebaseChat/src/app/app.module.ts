import { ChatPage } from './../pages/chat/chat';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';

import { AngularFireModule, FirebaseAppConfig, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { ChatService } from './../providers/chat/chat.service';
import { UserService } from './../providers/user.service/user.service';

const firebaseAppConfig: FirebaseAppConfig = {
    apiKey: "AIzaSyBZjiSVID8ANk1hantGP5PJCsl_lPSaxUA",
    authDomain: "ionic2-firebase-chat-3e633.firebaseapp.com",
    databaseURL: "https://ionic2-firebase-chat-3e633.firebaseio.com",
    storageBucket: "ionic2-firebase-chat-3e633.appspot.com",
    messagingSenderId: "418527449405"
  };

  // configurando metodo de autenticação no firebase..
  const firebaseAuthConfig ={
      provider: AuthProviders.Custom,
      method: AuthMethods.Password
  }

  
@NgModule({
  declarations: [
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    ChatPage,
    HomePage,
    MyApp,
    SignupPage,
    SigninPage,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ChatPage,
    HomePage,
    SignupPage,
    SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ChatService
   
  ]
})
export class AppModule {}
