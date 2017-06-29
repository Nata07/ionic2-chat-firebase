import { AuthProvider } from './../../providers/auth/auth';
import { UserService } from './../../providers/user.service/user.service';
import { User } from './../../model/user.model';
import { FirebaseListObservable } from 'angularfire2';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  view: string= 'chats';
  
  constructor(
    public authService: AuthProvider,
    public navCtrl: NavController,
    public userService: UserService
    ) {

  }

  ionViewCanEnter(): Promise<boolean>{
     return this.authService.autenticated;
  }

  ionViewDidLoad(){
     this.users = this.userService.users;
  } 

  onChatCreate(user: User): void{
    console.log(`Usuario`, user);
  }

  onSignup(): void{
    this.navCtrl.push(SignupPage);
  }
}
