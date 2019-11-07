import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-validate-email',
  templateUrl: './validate-email.component.html'
})
export class ValidateEmailComponent {
  formGroup: FormGroup;
  isResend = false;
  constructor(
    activatedRoute: ActivatedRoute,
    private authService: AuthService,
    formBuilder: FormBuilder
  ) {
    activatedRoute.params.subscribe(params => {
      if (params['resend']) {
        this.isResend = true;
      }
    });
    this.formGroup = formBuilder.group({
      email: ['', Validators.required]
    });
  }

  sendVerificationEmail() {
    this.authService.sendVerificationEmail({
      email: this.formGroup.value['email']
    })
      .subscribe(e => {
        this.isResend = false;
      });
  }
}
