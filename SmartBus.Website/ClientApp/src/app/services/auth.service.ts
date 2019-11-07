import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';
import { VerificationEmail } from '../models/verification-email-model';

export const AuthTokenKey = 'AuthToken';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(loginModel: LoginModel): Observable<string> {
    return this.http.post('/api/Account/Login', loginModel, {
      responseType: 'text'
    })
    .pipe(tap(token => {
      localStorage.setItem(AuthTokenKey, token);
    }));
  }

  clearToken() {
    localStorage.removeItem(AuthTokenKey);
  }

  isAuthenticated() {
    if (localStorage.getItem(AuthTokenKey)) {
      return true;
    } else {
      return false;
    }
  }

  register(registerModel: RegisterModel) {
    return this.http.post('/api/Account/Register', registerModel);
  }

  sendVerificationEmail(verificationEmail: VerificationEmail) {
    return this.http.post('/api/Account/SendConfirmationEmail', null, {
      params: {
        'email': verificationEmail.email
      }
    });
  }
}
