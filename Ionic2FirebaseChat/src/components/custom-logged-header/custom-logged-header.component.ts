import { MenuController, AlertController, App } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { Component, Input } from '@angular/core';
import { BaseComponent } from "../base.component";

import { User } from './../../model/user.model';


@Component({
  selector: 'custom-logged-header',
  templateUrl: 'custom-logged-header.component.html'
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;
  @Input() user: User;

  constructor(
    public alertCtrl: AlertController,
        public authService: AuthProvider,
        public app: App,
        public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

}
