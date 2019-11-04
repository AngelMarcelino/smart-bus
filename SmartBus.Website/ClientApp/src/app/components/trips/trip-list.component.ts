import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service';
import { Router } from '@angular/router';
import { BusService } from 'src/app/services/bus.service';
import { TimeUtilsService } from 'src/app/services/time-utils.service';
@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html'
})
export class TripListComponent implements OnInit {
  public trips;
  public dateTimeFormat = TimeUtilsService.DateTimeFormat;
  constructor(
    private tripService: TripService,
    private router: Router,
    public busService: BusService) {
  }

  ngOnInit(): void {
    this.gettrips();
  }
  gettrips() {
    this.tripService.getAll()
      .subscribe(trips => {
        this.trips = trips;
      });
  }

  delete(id: number) {
    if (confirm('¿Estas seguro que deseas eliminar?')) {
      this.tripService.delete(id)
        .subscribe(() => {
          this.gettrips();
        });
    }
  }

  edit(id: number) {
    this.router.navigate(['/', 'trips', 'edit', id]);
  }
}
