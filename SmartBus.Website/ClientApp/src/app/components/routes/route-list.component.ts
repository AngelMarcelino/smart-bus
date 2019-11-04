import { Component, OnInit } from '@angular/core';
import { RouteService } from 'src/app/services/route.service';
import { Router } from '@angular/router';
import { TimeUtilsService } from 'src/app/services/time-utils.service';
@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html'
})
export class RouteListComponent implements OnInit {
  public timeFormat = TimeUtilsService.TimeFormat;
  public routes;
  constructor(private routeService: RouteService, private router: Router) {
  }

  ngOnInit(): void {
    this.getroutes();
  }
  getroutes() {
    this.routeService.getAll()
      .subscribe(routes => {
        this.routes = routes;
      });
  }

  delete(id: number) {
    if (confirm('¿Estas seguro que deseas eliminar?')) {
      this.routeService.delete(id)
        .subscribe(() => {
          this.getroutes();
        });
    }
  }

  edit(id: number) {
    this.router.navigate(['/', 'routes', 'edit', id]);
  }
}
