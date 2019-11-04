import { Injectable } from '@angular/core';
import { ITrip } from '../models/trip';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TripService {
  baseUrl = '/api/Trip';
  constructor(private http: HttpClient) {

  }
  update(trip: ITrip) {
    return this.http.put(this.baseUrl, trip);
  }
  create(trip: ITrip) {
    console.log('trip: ', trip);
    return this.http.post(this.baseUrl, trip);
  }
  get(id: number): Observable<ITrip> {
    return this.http.get<ITrip>(this.baseUrl + '/' + id);
  }

  getAll(): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this.baseUrl);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
