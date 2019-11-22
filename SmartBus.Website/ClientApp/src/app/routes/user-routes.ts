import { Route } from '@angular/router';
import { ProfileComponent } from '../components/profile/profile.component';

export const UserRoutes: Route[] = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {
    path: 'profile',
    component: ProfileComponent
  }
];
