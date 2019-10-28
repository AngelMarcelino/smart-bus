import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class GuardNoAuthService implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {

  }
  activateFunctionality(): Observable<boolean> {
    return of(!this.authService.isAuthenticated());
  }
  canActivate(): Observable<boolean> {
    return this.activateFunctionality()
      .pipe(tap(ableToContinue => {
        if (!ableToContinue) {
          this.router.navigate(['']);
        }
      }));
  }
}
