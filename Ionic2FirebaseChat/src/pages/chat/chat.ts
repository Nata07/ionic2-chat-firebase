import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/auth/auth';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messsages: string[] = [];

  constructor(
    public authService: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewCanEnter(): Promise<boolean>{
     return this.authService.autenticated;
  }

  sendMessage(newMessage: string): void {
      this.messsages.push(newMessage);
  }

}
