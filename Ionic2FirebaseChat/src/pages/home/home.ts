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

  constructor(
    public navCtrl: NavController,
    public userService: UserService
    ) {

  }

  onChatCreate(user: User): void{
    console.log(`Usuario`, user);
  }

  ionViewDidLoad(){
     this.users = this.userService.users;
  } 
  onSignup(): void{
    this.navCtrl.push(SignupPage);
  }
}
