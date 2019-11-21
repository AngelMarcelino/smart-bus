import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDriver } from '../models/driver';
import { AuthService } from './auth.service';
import { DriverService } from './driver.service';
import { RouteService } from './route.service';
import { UiNotificationsService } from './ui-notifications/ui-notifications.service';
import { ITrip } from '../models/trip';

@Injectable()
export class DriverUserService {
  constructor(
    private httpClient: HttpClient,
    private driverService: DriverService,
    private authService: AuthService,
    private routeService: RouteService,
    private notificationService: UiNotificationsService
    ) {
    this.getCurrentDriver();
  }
  getCurrentDriver( ) {
    return this.driverService.getByUser(this.authService.session.userId);
  }
  getCurrentRoute(routeId: number) {
    if (!routeId) {
      this.notificationService.launchErrorNotification('No hay ruta asignada');
    } else {
      return this.routeService.get(routeId);
    }
  }

  startTrip(driverId: number, busId: number, routeId: number) {
    return this.httpClient.post<ITrip>('/api/Trip/StartTrip', null, {
      params: {
        driverId: driverId.toString(),
        busId: busId.toString(),
        routeId: routeId.toString()
      }
    });
  }

  getCurrentTrip(driverId: number) {
    return this.httpClient.get<ITrip>('/api/Driver/GetCurrentTrip/' + driverId);
  }

  finishDriversCurrentTrip(driverId: number) {
    return this.httpClient.post('/api/Trip/FinishDriversCurrentTrip/' + driverId, null);
  }
}
