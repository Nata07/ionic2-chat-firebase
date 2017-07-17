import { FirebaseListObservable } from 'angularfire2';
import { Chat } from './../../model/chat.model';
import { ChatService } from './../../providers/chat/chat.service';

import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

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
  chats: FirebaseListObservable<Chat[]>;
  view: string= 'chats';
  
  
  constructor(
    public authService: AuthProvider,
    public chatService: ChatService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService
    ) {

  }

  ionViewCanEnter(): Promise<boolean>{
     return this.authService.autenticated;
  }

  ionViewDidLoad(){
    this.chats = this.chatService.chats;
     this.users = this.userService.users;

     this.menuCtrl.enable(true, 'user-menu');
  } 
 
  filterItems(event: any): void {
    let searchItem: string = event.target.value;

      this.chats = this.chatService.chats;
      this.users = this.userService.users;

      if(searchItem){
        switch(this.view){
          
          case 'chats':
              this.chats = <FirebaseListObservable<Chat[]>>this.chats
                .map((chats: Chat[]) => {
                  return chats.filter((chat: Chat) => {
                      return (chat.title.toLowerCase().indexOf(searchItem.toLocaleLowerCase())> -1);
                  });
              });
          break;

          case 'users':
          this.users = <FirebaseListObservable<User[]>> this.users
            .map((users: User[]) => {
              return users.filter((user: User) => {
                return (user.name.toLocaleLowerCase().indexOf(searchItem.toLocaleLowerCase()) > -1);
              });
            });
          break;
        }
      }
    
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

              let chat1 = new Chat('', timestamp, recipientUser.name, (recipientUser.photo || ''));
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, currentUser.photo || '');
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);

            } else{

            }

          });
      })
    
    this.navCtrl.push(ChatPage, {
      recipientUser: recipientUser  
    });
  }

   onChatOpen(chat: Chat): void{
      
      let recipientUserId: string = chat.$key;
      this.userService.getUser(recipientUserId)
        .first()
        .subscribe((user: User) => {

          this.navCtrl.push(ChatPage, {
            recipientUser: user
          });
        });
  }

  onSignup(): void{
    this.navCtrl.push(SignupPage);
  }

 
}
