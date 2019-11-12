import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../models/login-model';
import { AuthService } from '../services/auth.service';
import { UiNotificationsService } from '../services/ui-notifications/ui-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  formGroup: FormGroup;
  showValidationError = false;
  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private uiNotifications: UiNotificationsService) {
      this.formGroup = formBuilder.group({
        'email': ['', Validators.compose([Validators.required])],
        'password': ['', Validators.compose([Validators.required])]
      });
  }
  onFormSubmit() {
    this.authService.login(<LoginModel>this.formGroup.value)
      .subscribe( {
        next: token => {
          if (token) {
            console.log(token);
            this.router.navigate(['/' + this.authService.session.role.toLowerCase()]);
          } else if (token === '') {
            this.router.navigate(['/no-auth', 'validate-email', 'resend']);
          } else {
            this.showValidationError = true;
          }
        },
        error: error => {
          this.uiNotifications.launchErrorNotification('Usuario y/o contraseña incorrectos');
        }
      });
  }

}
