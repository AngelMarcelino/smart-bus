import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginModel } from '../models/login-model';
import { RegisterModel } from '../models/register-model';
import { VerificationEmail } from '../models/verification-email-model';
import { JwtService } from './jwt.service';
import { ISession } from '../models/session';

export const AuthTokenKey = 'AuthToken';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private jwtService: JwtService) {
    const token = localStorage.getItem(AuthTokenKey);
    this.loadSession(token);
  }

  session: ISession;

  login(loginModel: LoginModel): Observable<string> {
    return this.http.post('/api/Account/Login', loginModel, {
      responseType: 'text'
    })
    .pipe(tap(token => {
      localStorage.setItem(AuthTokenKey, token);
      this.loadSession(token);
    }));
  }

  private loadSession(token) {
    if (token) {
      const tokenParsed = this.jwtService.parseJwt(token);
      this.session = {
        role: tokenParsed['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        email: tokenParsed['sub']
      };
    }
  }

  clearToken() {
    localStorage.removeItem(AuthTokenKey);
    this.session = null;
  }

  isAuthenticated() {
    const token = localStorage.getItem(AuthTokenKey);
    if (token) {
      const parsedToken = this.jwtService.parseJwt(token);
      const currentMillis =  new Date().getTime();
      const expiredDate = parsedToken.exp * 1000;
      if (currentMillis > expiredDate) {
        return false;
      } else {
        return true;
      }
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
