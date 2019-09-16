import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BusFormComponent } from './components/bus/bus-form.component';
import { BusService } from './services/bus.service';
import { BusListComponent } from './components/bus/bus-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BusListComponent,
    BusFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
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
    ])
  ],
  providers: [
    BusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
