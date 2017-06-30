import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuthState, FirebaseObjectObservable } from "angularfire2";

import { User } from './../../model/user.model';
import { BaseService } from "../base.service";

@Injectable()
export class UserService extends BaseService {
  
  users: FirebaseListObservable<User[]>;
  currentUser: FirebaseObjectObservable<User>;

  constructor(
    public af: AngularFire,
    public http: Http
    ) {
      super();
      this.users = this.af.database.list(`/users`)
      this.listenAuthState();
  }

  private listenAuthState(): void{
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if(authState) { 
          this.currentUser = this.af.database.object(`/users/${authState.auth.uid }`)
        }
      });
  }
  
  create(user: User, uuid: string): firebase.Promise<void>{
      return this.af.database.object(`/users/${uuid}`)
        .set(user)
        .catch(this.handlePromiseError);
    }
    
    // verificando se o usuario existe 
    userExite(username: string): Observable<boolean>{
      return this.af.database.list(`/users`, {
        query: {
          orderByChild: 'username', 
          equalTo: username
        }
      }).map((users: User[]) => {
        return users.length > 0;
      }).catch(this.handleObservableError);
    }
  
}
