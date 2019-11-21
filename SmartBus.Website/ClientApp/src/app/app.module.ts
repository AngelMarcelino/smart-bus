import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BusFormComponent } from './components/bus/bus-form.component';
import { BusService } from './services/bus.service';
import { BusListComponent } from './components/bus/bus-list.component';
import { MainViewAuthenticateComponent } from './components/main-view-authenticated/main-view-authenticated.component';
import { MainViewNoAuthenticatedComponent } from './components/main-view-no-authenticated/main-view-no-authenticated.component';
import { LoginComponent } from './components/login/login.component';
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
import { RegisterComponent } from './components/register/register.component';
import { ValidateEmailComponent } from './components/register/validate-email.component';
import { ValidationErrorComponent } from './components/register/validation-error.component';
import { ValidationSucceedComponent } from './components/register/validation-succeed.component';
import { UserFormComponent } from './components/users/user-form.component';
import { UserListComponent } from './components/users/user-list.component';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { AdminRoutes } from './routes/admin-routes';
import { NoAuthRoutes } from './routes/no-auth-routes';
import { MyTripsComponent } from './components/my-trips/my-trips.component';
import { DriverRoutes } from './routes/driver-routes';
import { UserGuardService, AdminGuardService, DriverGuardService } from './services/auth/role-guards.services';
import { BusesListEditorComponent } from './components/list-editors/buses-list-editor.component';
import { DriversListEditorComponent } from './components/list-editors/drivers-list-editor.component';
import { NavAdminComponent } from './components/nav-menu/nav-admin/nav-admin.component';
import { NavUserComponent } from './components/nav-menu/nav-user/nav-user.component';
import { NavDriverComponent } from './components/nav-menu/nav-driver/nav-driver.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { DriverUserService } from './services/driver-user.service';
import { RouteScheduleComponent } from './components/route-schedule/route-schedule.component';
import { CurrentTripComponent } from './components/current-trip/current-trip.component';

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
    RouteListComponent,
    RegisterComponent,
    ValidateEmailComponent,
    ValidationErrorComponent,
    ValidationSucceedComponent,
    UserFormComponent,
    UserListComponent,
    NavAdminComponent,
    NavUserComponent,
    NavDriverComponent,
    MyTripsComponent,
    BusesListEditorComponent,
    DriversListEditorComponent,
    RouteScheduleComponent,
    CurrentTripComponent
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
        children: NoAuthRoutes
      },
      {
        path: '',
        canActivate: [GuardAuthService],
        component: MainViewAuthenticateComponent,
        children: [
          {path: 'admin', redirectTo: ''},
          {
            path: '',
            children: AdminRoutes,
            canActivate: [AdminGuardService],
          },
          {
            path: 'driver',
            canActivate: [DriverGuardService],
            children: DriverRoutes
          },
          {
            path: 'user',
            canActivate: [UserGuardService],
            children: AdminRoutes
          }
        ]
      }
    ])
  ],
  providers: [
    BusService,
    GuardAuthService,
    GuardNoAuthService,
    JwtService,
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
    RouteService,
    AuthService,
    UserService,
    UserGuardService,
    AdminGuardService,
    DriverGuardService,
    DriverUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
