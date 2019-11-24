import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '../models/route';
import { CommonService } from './common.service';
import { Driver } from '../models/driver';
import { Trip } from '../models/trip';

@Injectable()
export class BusTerminalService {
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService
  ) {
  }
  getCurrentTrip(routeId: number, driverId: number) {
    return this.httpClient.get<Trip>(this.commonService.apiOrigin + '/api/Trip', {
      params: {
        'routeId': routeId.toString(),
        'driverId': driverId.toString()
      }
    });
  }


  getRoutes() {
    return this.httpClient.get<Route[]>(this.commonService.apiOrigin + '/api/Route');
  }

  getDrivers(routeId: number) {
    return this.httpClient.get<Driver[]>(this.commonService.apiOrigin + '/api/Driver', {
      params: {
        'routeId': routeId.toString()
      }
    });
  }

  newPassage(tripId: number, user: string, password: string) {
    return this.httpClient
      .post(
        this.commonService.apiOrigin + '/api/Trip/NewPassage/' + tripId, {
          email: user,
          password: password
        }
      );
  }
}
