import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';


@Injectable()
export class AdminGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  activateFunctionality() {
    return of(this.authService.session.role === 'Admin')
      .pipe(tap(result => {
        if (!result) {
          this.router.navigate([this.authService.session.role.toLowerCase()]);
        }
      }));
  }
  canActivate() {
    return this.activateFunctionality();
  }
}

@Injectable()
export class UserGuardService  implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {

  }

  activateFunctionality() {
    return of(this.authService.session.role === 'User');
  }
  canActivate() {
    return this.activateFunctionality()
    .pipe(tap(result => {
      if (!result) {
        this.router.navigate([this.authService.session.role.toLowerCase()]);
      }
    }));
  }
}

@Injectable()
export class DriverGuardService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
    ) {

  }

  activateFunctionality() {
    return of(this.authService.session.role === 'Driver');
  }
  canActivate() {
    return this.activateFunctionality()
    .pipe(tap(result => {
      if (!result) {
        this.router.navigate([this.authService.session.role.toLowerCase()]);
      }
    }));
  }
}
