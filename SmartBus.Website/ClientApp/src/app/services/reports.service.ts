import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TripsByUserRow } from '../models/trips-by-user';
import { RoutesByUserRow } from '../models/routes-by-user-row';

@Injectable()
export class ReportsService {
  constructor(private httpClient: HttpClient) {

  }
  getTripsByUser() {
    return this.httpClient.get<TripsByUserRow[]>('/api/Reports/GetTripsByUser');
  }
  getRoutesByUser() {
    return this.httpClient.get<RoutesByUserRow[]>('/api/Reports/GetRoutesByUser');
  }
}
