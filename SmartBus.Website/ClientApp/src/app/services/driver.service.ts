import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDriver } from '../models/driver';
import { Observable } from 'rxjs';

@Injectable()
export class DriverService {
  baseUrl = '/api/Driver';
  constructor(private http: HttpClient) {

  }
  update(driver: IDriver) {
    return this.http.put(this.baseUrl, driver);
  }
  create(driver: IDriver) {
    console.log('driver: ', driver);
    return this.http.post(this.baseUrl, driver);
  }
  get(id: number): Observable<IDriver> {
    return this.http.get<IDriver>(this.baseUrl + '/' + id);
  }

  getAll(): Observable<IDriver[]> {
    return this.http.get<IDriver[]>(this.baseUrl);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
