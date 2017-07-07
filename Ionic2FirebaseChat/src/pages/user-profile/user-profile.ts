import { UserService } from './../../providers/user.service/user.service';
import { User } from './../../model/user.model';
import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
    
    currentUser: User;
    canEdit: boolean = false;
    private filePhoto: File;

  constructor(
    public authService: AuthProvider,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
    ) {
  }
  
   ionViewCanEnter(): Promise<boolean>{
     return this.authService.autenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onSubmit(event: Event): void{
    event.preventDefault();
    if(this.filePhoto){
      
      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);
      uploadTask.on('state_changed', (snapshot) => {

      }, (error: Error) =>{

      }, () => {
          this.editUser(uploadTask.snapshot.downloadURL);
      });
    }else{
      this.editUser();
    }
  }

  private editUser(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
      });
  }

  onPhoto(event): void {
    this.filePhoto= event.target.files[0];
  }

}
