import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TripService } from 'src/app/services/trip.service';
import { ITrip } from 'src/app/models/trip';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BusService } from 'src/app/services/bus.service';
import { DriverService } from 'src/app/services/driver.service';
import { IBus } from 'src/app/models/bus';
import { IDriver } from 'src/app/models/driver';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html'
})
export class TripFormComponent implements OnInit {

  trip: ITrip;
  private isEdit = false;
  buses: IBus[] = [];
  drivers: IDriver[] = [];
  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private router: Router,
    activatedRoute: ActivatedRoute,
    public busService: BusService,
    private driverService: DriverService) {
      activatedRoute.params.subscribe(data => {
        if (data.id) {
          this.isEdit = true;
          this.tripService.get(data.id)
            .subscribe(trip => {
              this.tripForm.setValue({
                startDate: trip.startDate,
                driverId: trip.driverId,
                busId: trip.busId,
                id: trip.id,
                endDate: trip.endDate
              });
            });
        }
      });
  }
  tripForm = this.fb.group({
    busId: ['', Validators.required],
    driverId: ['', Validators.required],
    endDate: [''],
    startDate: ['', Validators.required],
    id: [0]
  });
  getBuses() {
    this.busService.getAll()
      .subscribe(buses => this.buses = buses);
  }

  getDrivers( ) {
    this.driverService.getAll()
      .subscribe(drivers => this.drivers = drivers);
  }
  ngOnInit(): void {
    this.getBuses();
    this.getDrivers();
  }
  onSubmit() {
    this.trip = {
      id: this.tripForm.controls['id'].value || 0,
      busId: this.tripForm.controls['busId'].value || 0,
      driverId: this.tripForm.controls['driverId'].value || 0,
      endDate: this.tripForm.controls['endDate'].value || '',
      startDate: this.tripForm.controls['startDate'].value || ''
    };
    this.save();
  }
  save() {
    let observable: Observable<any>;
    if (!this.isEdit) {
      observable = this.tripService.create(this.trip);
    } else {
      observable = this.tripService.update(this.trip);
    }
    observable.subscribe(() => {
      this.router.navigate(['/', 'trips']);
    });
  }
}
