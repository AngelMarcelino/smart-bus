import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterModel } from 'src/app/models/register-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  onFormSubmit() {
    this.authService.register(<RegisterModel> this.registerForm.value)
      .subscribe(e => this.router.navigate(['/no-auth', 'validate-email']));
  }
}
