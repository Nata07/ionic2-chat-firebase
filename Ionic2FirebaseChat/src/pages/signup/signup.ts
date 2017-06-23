import { FirebaseAuthState } from 'angularfire2';
import { User } from './../../model/user.model';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { UserService } from './../../providers/user.service/user.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  signupForm: FormGroup;
  
  constructor(
    public authService: AuthServiceProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
    ) {
      
      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signupForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }
  
  onSubmit(): void{ 
    let user: User = this.signupForm.value;
    
    this.authService.createAuthUser({
          email: user.email,
          password: user.password
    })
    .then((authState: FirebaseAuthState) => {
      this.userService.create(user)
        .then(() => { 
          console.log('Usuario cadastrado');
              
        });
    });
  }
}