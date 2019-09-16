import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/services/bus.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bus-list',
  templateUrl: './bus-list.component.html'
})
export class BusListComponent implements OnInit {
  public buses;
  constructor(private busService: BusService, private router: Router) {
  }

  ngOnInit(): void {
    this.getBuses();
  }
  getBuses() {
    this.busService.getAll()
      .subscribe(buses => {
        this.buses = buses;
      });
  }

  delete(id: number) {
    if (confirm('¿Estas seguro que deseas eliminar?')) {
      this.busService.delete(id)
        .subscribe(() => {
          this.getBuses();
        });
    }
  }

  edit(id: number) {
    this.router.navigate(['/', 'autobuses', 'edit', id]);
  }
}
