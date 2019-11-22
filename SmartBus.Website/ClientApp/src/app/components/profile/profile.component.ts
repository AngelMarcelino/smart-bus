import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements AfterViewInit {

  private _currentUser: IUser;
  imagePath = '';
  set currentUser(value: IUser) {
    this._currentUser = value;
    this.imagePath = '/api/User/GetProfileImage/' + value.id + '?lala=' + Math.random();
  }
  get currentUser(): IUser {
    return this._currentUser;
  }
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {
    this.getCurrentUser();
  }



  private getCurrentUser() {
    this.userService.get(this.authService.session.userId)
      .subscribe(user => {
        this.currentUser = user;
      });
  }
  ngAfterViewInit(): void {
    const inputFile: HTMLInputElement = this.inputFile.nativeElement;
    inputFile.addEventListener('change', () => {
      if (inputFile.files && inputFile.files.length > 0 && inputFile.files[0]) {
        const formData = new FormData();
        formData.append('profile-image', inputFile.files[0]);
        this.userService.uploadProfileImage(this.currentUser.id, formData)
          .subscribe(e => {
            this.currentUser = this.currentUser;
          });
      }
    });
  }
}
