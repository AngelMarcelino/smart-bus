import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BusTerminalService } from 'src/app/services/bus-terminal.service';
import { Route } from 'src/app/models/route';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, mergeMap } from 'rxjs/operators';
import { Driver } from 'src/app/models/driver';
import { Trip, TripStatus } from 'src/app/models/trip';

interface RouteDriver {
  routeId: string;
  driverId: number;
}

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  formGroup: FormGroup;
  routes: Route[] = [];
  drivers: Driver[] = [];
  @Output()
  currentTrip: EventEmitter<Trip>;
  constructor(private busTerminalService: BusTerminalService, formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      routeId: ['', Validators.required],
      driverId: ['', Validators.required]
    });
    this.currentTrip = new EventEmitter<Trip>();
  }

  ngOnInit(): void {
    this.busTerminalService.getRoutes()
    .subscribe(routes => {
      this.routes = routes;
    });
    this.formGroup.controls['routeId'].valueChanges.subscribe((newValue) => {
      const selectedRoute = this.routes.find(route => route.id === parseInt(newValue, 10));
      if (selectedRoute) {
        const firstDriver = selectedRoute.drivers[0];
        if (firstDriver) {
          this.formGroup.controls['driverId'].setValue(firstDriver.id);
          this.drivers = selectedRoute.drivers;
        } else {
          this.drivers = [];
        }
      }
    });
  }
  getDriversByRouteId(routeId: number) {
    this.busTerminalService.getDrivers(routeId)
      .subscribe(drivers => {
        this.drivers = drivers;
      });
  }
  formSubmit() {
    const formValue: RouteDriver = this.formGroup.value;
    const route = this.routes.find(e => e.id === parseInt(formValue.routeId, 10));
    const trip = route
      .trips.find(t => t.driverId === formValue.driverId && t.tripStatus === TripStatus.started);
    if (!trip) {
      alert('No se encotraron viajes activos');
    } else {
      trip.route = route;
      this.currentTrip.emit(trip);
    }
  }
}
