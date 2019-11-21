import { Component } from '@angular/core';
import { DriverUserService } from 'src/app/services/driver-user.service';
import { mergeMap, tap } from 'rxjs/operators';
import { IRoute } from 'src/app/models/route';
import { IDriver } from 'src/app/models/driver';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { ITrip } from 'src/app/models/trip';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html'
})
export class MyTripsComponent {
  constructor(
    private driverUserService: DriverUserService,
    public busService: BusService,
    formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({
      busId: ['', Validators.required]
    });
    this.getCurrentRoute();
    this.getBuses();
  }
  nextTripHour: Date;
  buses: IBus[] = [];
  formGroup: FormGroup;
  currentRoute: IRoute;
  currentDriver: IDriver;
  currentTrip: ITrip = null;
  private getBuses() {
    this.busService.getAll()
      .subscribe(buses => {
        this.buses = buses;
      });
  }
  private getCurrentRoute() {
    this.driverUserService
      .getCurrentDriver()
      .pipe(
        tap(driver => this.currentDriver = driver),
        tap(driver => this.getCurrentTrip()),
        mergeMap(driver => this.driverUserService.getCurrentRoute(driver.routeId))
      )
      .subscribe(route => {
        this.currentRoute = route;
      });
  }

  private getCurrentTrip() {
    const currentDriverId = this.currentDriver.id;
    this.driverUserService.getCurrentTrip(currentDriverId)
      .subscribe(currentTrip => this.currentTrip = currentTrip);
  }


  getNextTripHour() {
    if (this.currentRoute) {
      const dateTime = new Date(<string>this.currentRoute.firstLeavingHour);
    } else {
      return '';
    }
  }

  startTrip() {
    const currentDriverId = this.currentDriver.id;
    const currentRouteId = this.currentRoute.id;
    const currentBusId = parseInt(this.formGroup.controls['busId'].value, 10);
    this.driverUserService.startTrip(currentDriverId, currentBusId, currentRouteId)
      .subscribe(createdTrip => {
        this.currentTrip = createdTrip;
      });
  }

  finishTrip() {
    const currentDriverId = this.currentDriver.id;
    this.driverUserService.finishDriversCurrentTrip(currentDriverId)
      .subscribe(e => {
        this.currentTrip = null;
      });
  }

  setNextHour(nextHour) {
    this.nextTripHour = nextHour;
  }
}
