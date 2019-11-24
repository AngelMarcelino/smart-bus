import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
  tokenStoreKey: string;
  constructor(private http: HttpClient, private commonService: CommonService) {
    this.tokenStoreKey = 'token';
  }
  login() {
    return this.http.post(this.commonService.apiOrigin + '/api/Account/Login', {
      email: 'admin@smartbus.com',
      password: 'password'
    }, {
      responseType: 'text'
    }).pipe(
      tap(token => {
        localStorage.setItem(this.tokenStoreKey, token);
      })
    );

  }

  getAuthToken(): string {
    return localStorage.getItem(this.tokenStoreKey);
  }
}
