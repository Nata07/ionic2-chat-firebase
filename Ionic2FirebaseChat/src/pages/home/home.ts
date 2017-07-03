import { Chat } from './../../model/chat.model';
import { ChatService } from './../../providers/chat/chat.service';

import { FirebaseListObservable } from 'angularfire2';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';
import { User } from './../../model/user.model';
import { UserService } from './../../providers/user.service/user.service';

import { ChatPage } from './../chat/chat';
import { SignupPage } from './../signup/signup';

import firebase  from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: FirebaseListObservable<User[]>;
  view: string= 'chats';
  
  constructor(
    public authService: AuthProvider,
    public chatService: ChatService,
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

  onChatCreate(recipientUser: User): void {
      
      this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
          this.chatService.getDeepChat(currentUser.$key, recipientUser.$key)
          .first()
          .subscribe((chat: Chat) => {
            
            if(chat.hasOwnProperty('$value')){

              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, '');
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, '');
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);

            } else{

            }

          });
      })
    
    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser  
    });
  }

  onSignup(): void{
    this.navCtrl.push(SignupPage);
  }
}
