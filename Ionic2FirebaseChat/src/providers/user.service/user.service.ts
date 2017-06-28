import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable } from "angularfire2";

import { User } from './../../model/user.model';
import { BaseService } from "../base.service";

@Injectable()
export class UserService extends BaseService {
  
  users: FirebaseListObservable<User[]>;

  constructor(
    public af: AngularFire,
    public http: Http
    ) {
      super();
      this.users = this.af.database.list(`/users`)

  }

  create(user: User): firebase.Promise<void>{
      return this.af.database.object(`/users/${user.uid}`)
        .set(user)
        .catch(this.handlePromiseError);
    }

    userExite(username: string): Observable<boolean>{
      this.af.database.list(`/users`);

      return null;
    }
  
}
