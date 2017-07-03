import { FirebaseObjectObservable } from 'angularfire2';
import { AngularFire } from 'angularfire2';
import { Chat } from './../../model/chat.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "../base.service";

@Injectable()
export class ChatService extends BaseService {

  constructor(
    public http: Http,
    public af: AngularFire
    ) {
    super();
  }

  create(chat: Chat, userId1: string, userId2: string): firebase.Promise<void>{
      return this.af.database.object(`/chats/${userId1}/${userId2}`)
        .set(chat)
        .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string): FirebaseObjectObservable<Chat>{
    return <FirebaseObjectObservable<Chat>> this.af.database.object(`/chats/${userId1}/${userId2}`)
      .catch(this.handleObservableError);
  }

}
