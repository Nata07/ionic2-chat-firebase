import { FirebaseAuthState } from 'angularfire2';
import { UserService } from './../providers/user.service/user.service';
import { AuthProvider } from './../providers/auth/auth';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { User } from './../model/user.model';
import { SigninPage } from './../pages/signin/signin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;
  currentUser: User;

  constructor(
    authService: AuthProvider,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    userService: UserService
    ) {

      authService
        .auth
          .subscribe((authState: FirebaseAuthState) => {
            if(authState){
              userService.currentUser
                .subscribe((user: User) => {
                  this.currentUser = user;
                });
            }
          });



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

