import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BusTerminalService } from './services/bus-terminal.service';
import { InfoComponent } from './components/info.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonService } from './services/common.service';
import { SetupComponent } from './components/setup/setup.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthInterceptorService } from './services/auth/auth-interceptor.service';
import { ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    BusTerminalService,
    CommonService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
