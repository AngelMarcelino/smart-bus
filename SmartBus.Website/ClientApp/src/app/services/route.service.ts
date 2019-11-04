import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRoute } from '../models/route';
import { Observable } from 'rxjs';

@Injectable()
export class RouteService {
  baseUrl = '/api/Route';
  constructor(private http: HttpClient) {

  }
  update(route: IRoute) {
    return this.http.put(this.baseUrl, route);
  }
  create(route: IRoute) {
    console.log('route: ', route);
    return this.http.post(this.baseUrl, route);
  }
  get(id: number): Observable<IRoute> {
    return this.http.get<IRoute>(this.baseUrl + '/' + id);
  }

  getAll(): Observable<IRoute[]> {
    return this.http.get<IRoute[]>(this.baseUrl);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
