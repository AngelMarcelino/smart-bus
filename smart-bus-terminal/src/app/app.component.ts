import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Trip } from './models/trip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  currentTrip: Trip;
  constructor(private authService: AuthenticationService) {
    authService.login()
      .subscribe(token => {
        console.log(token);
      });
  }
  setCurrentTrip(trip: Trip) {
    this.currentTrip = trip;
  }
}
