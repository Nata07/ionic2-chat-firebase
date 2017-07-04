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
      this.listenAuthState();
  }

  private setUsers(uidToExclude: string): void{
    this.users = <FirebaseListObservable<User[]>>this.af.database.list(`/users`, {
      // ordena por nome
      query: {
        orderByChild: 'name'
      }
    }).map((users: User[]) => {
      return users.filter((user: User) => user.$key !== uidToExclude); 
    });
  }

  private listenAuthState(): void{
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if(authState) { 
          console.log('auth State Auterado!...');
          this.currentUser = this.af.database.object(`/users/${authState.auth.uid }`);
          this.setUsers(authState.auth.uid);
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
  
  getUser(userId: string): FirebaseObjectObservable<User>{
    return <FirebaseObjectObservable<User>> this.af.database.object(`/users/${userId}`)
      .catch(this.handleObservableError);
  }
}
