import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FirebaseAuthState } from "angularfire2";

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(
    public auth: AuthServiceProvider,
    public http: Http
    
    ) {
    console.log('Hello AuthServiceProvider Provider');
  }

  createAuthUser(user: { email, password: string}) : firebase.Promise<FirebaseAuthState>{
    return this.auth.createAuthUser(user); 
  }

}
