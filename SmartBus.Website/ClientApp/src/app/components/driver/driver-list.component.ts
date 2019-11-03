import { Component, OnInit } from '@angular/core';
import { DriverService } from 'src/app/services/driver.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html'
})
export class DriverListComponent implements OnInit {
  public drivers;
  constructor(private driverService: DriverService, private router: Router) {
  }

  ngOnInit(): void {
    this.getdrivers();
  }
  getdrivers() {
    this.driverService.getAll()
      .subscribe(drivers => {
        this.drivers = drivers;
      });
  }

  delete(id: number) {
    if (confirm('¿Estas seguro que deseas eliminar?')) {
      this.driverService.delete(id)
        .subscribe(() => {
          this.getdrivers();
        });
    }
  }

  edit(id: number) {
    this.router.navigate(['/', 'drivers', 'edit', id]);
  }
}
