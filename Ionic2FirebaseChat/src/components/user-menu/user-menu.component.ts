import { User } from './../../model/user.model';
import { Component, Input } from '@angular/core';

import { AlertController, App, MenuController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { BaseComponent } from "../base.component";

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {
  
  @Input('user') currentUser: User;

  constructor(
      public alertCtrl: AlertController,
      public authService: AuthProvider,
      public app: App,
      public menuCtrl: MenuController,
      
  ) { 
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void {
    console.log('user profile');
    
  }
}
