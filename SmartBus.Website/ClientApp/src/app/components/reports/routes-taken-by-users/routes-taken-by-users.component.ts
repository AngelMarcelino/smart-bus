import {Component} from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { RoutesByUserRow } from 'src/app/models/routes-by-user-row';

class RouteReport {
  routeId: number;
  routeName: string;
}

class RoutesByUser {
  userId: number;
  name: string;
  lastName: string;
  routes: RouteReport[];
}

@Component({
  selector: 'app-routes-taken-by-users',
  templateUrl: './routes-taken-by-users.component.html'
})
export class RoutesTakenByUserComponent {
  routesTakenByUser: RoutesByUser[];
  constructor(private reportService: ReportsService) {
    this.getRoutesByUser();
  }
  private getRoutesByUser() {
    this.reportService.getRoutesByUser()
      .subscribe(e => {
        const result: RoutesByUser[] = [];
        e.forEach(data => {
          const row = result.find(re => re.userId === data.userId);
          if (row) {
            row.routes.push({
              routeId: data.routeId,
              routeName: data.routeName
            });
          } else {
            result.push({
              userId: data.userId,
              lastName: data.lastName,
              name: data.name,
              routes: [{
                routeId: data.routeId,
                routeName: data.routeName
              }]
            });
          }
        });
        this.routesTakenByUser = result;
      });
  }
}
