import { Route } from '@angular/router';
import { MyTripsComponent } from '../components/my-trips/my-trips.component';

export const DriverRoutes: Route[] = [
  {path: '', redirectTo: 'my-trips', pathMatch: 'full'},
  {
    path: 'my-trips',
    component: MyTripsComponent
  }
];
