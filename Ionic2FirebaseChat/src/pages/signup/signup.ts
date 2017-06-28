import { FirebaseAuthState } from 'angularfire2';
import { AuthProvider } from './../../providers/auth/auth';
import { UserService } from './../../providers/user.service/user.service';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import 'rxjs/add/operator/first';

import { HomePage } from './../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
  signupForm: FormGroup; 
  
  constructor(
    public authService: AuthProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
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
    
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    let username: string = formUser.username;

    // verificando resposta se usuario existe
    this.userService.userExite(username)
      .first()
      .subscribe((userExiste: boolean) => {
          if(!userExiste){
            this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authState: FirebaseAuthState) => {
        
          delete formUser.password;
          formUser.uid = authState.auth.uid;
  
          this.userService.create(formUser)
          .then(() => {
            console.log('Usuario cadastrado');
            this.navCtrl.setRoot(HomePage);
            loading.dismiss();
          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });

          }).catch((error: any) => {  
                  console.log(error);
                  loading.dismiss();
                  this.showAlert(error);
          });
          }else{
            this.showAlert(`O username <bold> ${username} </bold> ja esta cadastrado!`);
            loading.dismiss();
          }
      });
  }

  private showLoading(): Loading{
    let loading: Loading = this.loadCtrl.create({
      content: 'Caregando....'  
    });
    loading.present();
    return loading;
  }

  private showAlert(message: string): void{
      this.alertCtrl.create({
        message: message,
        buttons: ['Ok']
      }).present();
  }
}
