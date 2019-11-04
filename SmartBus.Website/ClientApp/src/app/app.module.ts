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
import { MainViewAuthenticateComponent } from './components/main-view-authenticated/main-view-authenticated.component';
import { MainViewNoAuthenticatedComponent } from './components/main-view-no-authenticated/main-view-no-authenticated.component';
import { LoginComponent } from './login/login.component';
import { GuardAuthService } from './services/auth/guard-auth.service';
import { GuardNoAuthService } from './services/auth/guard-no-auth.service';
import { AuthService } from './services/auth.service';
import { UiNotificationsService } from './services/ui-notifications/ui-notifications.service';
import { AlertUINotificationsService } from './services/ui-notifications/alert-ui-notifications.service';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { DriverListComponent } from './components/driver/driver-list.component';
import { DriverFormComponent } from './components/driver/driver-form.component';
import { DriverService } from './services/driver.service';
import { TripService } from './services/trip.service';
import { TripListComponent } from './components/trips/trip-list.component';
import { TripFormComponent } from './components/trips/trip-form.component';
import { RouteFormComponent } from './components/routes/route-form.component';
import { RouteListComponent } from './components/routes/route-list.component';
import { RouteService } from './services/route.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BusListComponent,
    BusFormComponent,
    MainViewAuthenticateComponent,
    MainViewNoAuthenticatedComponent,
    LoginComponent,
    DriverFormComponent,
    DriverListComponent,
    TripListComponent,
    TripFormComponent,
    RouteFormComponent,
    RouteListComponent
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
          },
          {
            path: 'drivers',
            children: [
              {
                path: '',
                component: DriverListComponent
              },
              {
                path: 'add',
                component: DriverFormComponent
              },
              {
                path: 'edit/:id',
                component: DriverFormComponent
              }
            ]
          },
          {
            path: 'trips',
            children: [
              {
                path: '',
                component: TripListComponent
              },
              {
                path: 'add',
                component: TripFormComponent
              },
              {
                path: 'edit/:id',
                component: TripFormComponent
              }
            ]
          },
          {
            path: 'routes',
            children: [
              {
                path: '',
                component: RouteListComponent
              },
              {
                path: 'add',
                component: RouteFormComponent
              },
              {
                path: 'edit/:id',
                component: RouteFormComponent
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
    },
    DriverService,
    TripService,
    RouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
