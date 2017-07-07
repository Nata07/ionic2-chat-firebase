import { SigninPage } from './../pages/signin/signin';
import { NavController, AlertController, MenuController, App } from 'ionic-angular';
import { OnInit } from "@angular/core";

import { AuthProvider } from './../providers/auth/auth';

export abstract class BaseComponent implements OnInit {

    protected navCtrl: NavController

    constructor(
        public alertCtrl: AlertController,
        public authService: AuthProvider,
        public app: App,
        public menuCtrl: MenuController
    ) {}
    
    ngOnInit(): void{
        this.navCtrl = this.app.getActiveNav();
    }

    onLogout(): void{
        this.alertCtrl.create({
            message: 'Voce deseja sair?',
            buttons: [
                {
                    text: 'Yes', 
                    handler: () => {
                        this.authService.logout()
                            .then(() => {
                                this.navCtrl.setRoot(SigninPage);
                                this.menuCtrl.enable(false, 'user-menu');
                            });
                    }
                },
                {
                    text: 'No'
                }
            ]
        }).present();
    }
}