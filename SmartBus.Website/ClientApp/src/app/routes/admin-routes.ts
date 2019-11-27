import { BusListComponent } from '../components/bus/bus-list.component';

import { BusFormComponent } from '../components/bus/bus-form.component';

import { DriverListComponent } from '../components/driver/driver-list.component';

import { DriverFormComponent } from '../components/driver/driver-form.component';

import { TripListComponent } from '../components/trips/trip-list.component';

import { TripFormComponent } from '../components/trips/trip-form.component';

import { RouteListComponent } from '../components/routes/route-list.component';

import { RouteFormComponent } from '../components/routes/route-form.component';

import { UserListComponent } from '../components/users/user-list.component';

import { UserFormComponent } from '../components/users/user-form.component';
import { Route } from '@angular/router';
import { MainReportViewComponent } from '../components/reports/main-report-view.component';


export const AdminRoutes: Route[] = [
  {path: '', redirectTo: 'autobuses', pathMatch: 'full'},
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
  },
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'add',
        component: UserFormComponent
      },
      {
        path: 'edit/:id',
        component: UserFormComponent
      }
    ]
  },
  {
    path: 'reports',
    component: MainReportViewComponent
  }
];


