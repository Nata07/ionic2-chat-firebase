import { HomePage } from './../home/home';
import { AuthProvider } from './../../providers/auth/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { SignupPage } from './../signup/signup';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
    
    signinForm: FormGroup; 

  constructor(
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthProvider,
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {

      let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

      this.signinForm = this.formBuilder.group({
        email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
  }

  onSubmit(): void{ 
    
    // verificando dados do usuario para login
    
    let loading: Loading = this.showLoading();
    

    this.authService.signinWithEmail(this.signinForm.value)    
      .then((isLogged: boolean) => {
        if(isLogged){
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
        
      });
  }

  onSignup(): void{
    this.navCtrl.push(SignupPage);
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
  
  onHomePage(): void{
    this.navCtrl.push(HomePage);

  }

  onLogout(): void{
    this.navCtrl.push(SignupPage);
  }
}
