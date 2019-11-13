import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RouteService } from 'src/app/services/route.service';
import { IRoute, IDriverFromDb } from 'src/app/models/route';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { DriverService } from 'src/app/services/driver.service';
import { IDriver } from 'src/app/models/driver';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html'
})
export class RouteFormComponent {
  buses: IBus[] = [];
  displayBuses: IBus[] = [];
  drivers: IDriverFromDb[] = [];
  displayDrivers: IDriverFromDb[] = [];
  route: IRoute;
  private isEdit = false;
  constructor(
    private fb: FormBuilder,
    private routeService: RouteService,
    private router: Router,
    activatedRoute: ActivatedRoute,
    driverService: DriverService,
    busService: BusService) {
      activatedRoute.params.subscribe(data => {
        if (data.id) {
          this.isEdit = true;
          this.routeService.get(data.id)
            .subscribe(route => {
              this.buses = [...(route.buses || [])];
              this.drivers = [...(route.drivers || [])];
              this.routeForm.setValue({
                name: route.name,
                id: route.id,
                firstLeavingHour: (<string>route.firstLeavingHour || ''),
                lastLeavingHour: (<string>route.lastLeavingHour || ''),
                intervalInMinutes: route.intervalInMinutes
              });

            });
        }
      });
      busService.getAll()
      .subscribe(e => {
        this.displayBuses = e.filter(f => !f.routeId);
      });
      driverService.getAll()
      .subscribe(f => {
        this.displayDrivers = f.filter(e => !e.routeId).map(e => <IDriverFromDb>({
          id: e.id,
          phone: e.phone,
          registerDate: e.registerDate,
          routeId: e.routeId,
          user: {
            balance: 0,
            email: '',
            id: 0,
            lastName: e.lastName,
            name: e.name
          },
          userId: 0
        }));
      });
  }
  routeForm = this.fb.group({
    name: ['', Validators.required],
    firstLeavingHour: ['', Validators.required],
    lastLeavingHour: ['', Validators.required],
    intervalInMinutes: 15,
    id: [0]
  });
  onSubmit() {
    this.route = {
      id: this.routeForm.controls['id'].value || 0,
      name: this.routeForm.controls['name'].value,
      lastLeavingHour: this.routeForm.controls['lastLeavingHour'].value,
      firstLeavingHour: this.routeForm.controls['firstLeavingHour'].value,
      intervalInMinutes: this.routeForm.controls['intervalInMinutes'].value,
      buses: [...this.buses],
      drivers: [...this.drivers]
    };
    this.save();
  }
  save() {
    let observable: Observable<any>;
    if (!this.isEdit) {
      observable = this.routeService.create(this.route);
    } else {
      observable = this.routeService.update(this.route);
    }
    observable.subscribe(() => {
      this.router.navigate(['/', 'routes']);
    });
  }
}
