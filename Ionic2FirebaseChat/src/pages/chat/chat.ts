import { UserService } from './../../providers/user.service/user.service';
import { User } from './../../model/user.model';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messsages: string[] = [];
  pageTitle: string;
  sender: User;
  recipient: User;

  constructor(
    public authService: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
    ) {
  }

  ionViewCanEnter(): Promise<boolean>{
     return this.authService.autenticated;
  }

  ionViewDidLoad(){
    
     this.recipient = this.navParams.get('recipientUser');
     this.pageTitle = this.recipient.name;

     this.userService.currentUser
       .first()
       .subscribe((currentUser: User) => {
         this.sender = currentUser;
       });
  }

  sendMessage(newMessage: string): void {
      this.messsages.push(newMessage);
  }

}
