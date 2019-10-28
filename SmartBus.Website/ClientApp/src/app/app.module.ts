import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BusFormComponent } from './components/bus/bus-form.component';
import { BusService } from './services/bus.service';
import { BusListComponent } from './components/bus/bus-list.component';
import { MainViewAuthenticateComponent } from './main-view-authenticated/main-view-authenticated.component';
import { MainViewNoAuthenticatedComponent } from './main-view-no-authenticated/main-view-no-authenticated.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './services/auth/guard-auth.service';
import { GuardNoAuthService } from './services/auth/guard-no-auth.service';
import { AuthService } from './services/auth.service';
import { UiNotificationsService } from './services/ui-notifications/ui-notifications.service';
import { AlertUINotificationsService } from './services/ui-notifications/alert-ui-notifications.service';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BusListComponent,
    BusFormComponent,
    MainViewAuthenticateComponent,
    MainViewNoAuthenticatedComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        canActivate: [GuardNoAuthService],
        path: 'no-auth',
        component: MainViewNoAuthenticatedComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          }
        ]
      },
      {
        path: '',
        canActivate: [GuardAuthService],
        component: MainViewAuthenticateComponent,
        children: [
          { path: '', redirectTo: 'autobuses', pathMatch: 'full' },
          {
            path: 'autobuses',
            children: [
              {
                path: '',
                component: BusListComponent
              },
              {
                path: 'add',
                component: BusFormComponent
              },
              {
                path: 'edit/:id',
                component: BusFormComponent
              }
            ]
          }
        ]
      }
    ])
  ],
  providers: [
    BusService,
    GuardAuthService,
    GuardNoAuthService,
    AuthService,
    {
      provide: UiNotificationsService,
      useClass: AlertUINotificationsService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
