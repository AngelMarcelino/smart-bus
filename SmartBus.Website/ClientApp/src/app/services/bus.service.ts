import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBus } from '../models/bus';
import { Observable } from 'rxjs';

@Injectable()
export class BusService {
  baseUrl = '/api/Bus';
  constructor(private http: HttpClient) {

  }
  update(bus: IBus) {
    return this.http.put(this.baseUrl, bus);
  }
  create(bus: IBus) {
    console.log('bus: ', bus);
    return this.http.post(this.baseUrl, bus);
  }
  get(id: number): Observable<IBus> {
    return this.http.get<IBus>(this.baseUrl + '/' + id);
  }

  getAll(): Observable<IBus[]> {
    return this.http.get<IBus[]>(this.baseUrl);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
