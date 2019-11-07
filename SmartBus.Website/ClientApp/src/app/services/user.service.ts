import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  baseUrl = '/api/User';
  constructor(private http: HttpClient) {

  }
  update(user: IUser) {
    return this.http.put(this.baseUrl, user);
  }
  create(user: IUser) {
    console.log('user: ', user);
    return this.http.post(this.baseUrl, user);
  }
  get(id: number): Observable<IUser> {
    return this.http.get<IUser>(this.baseUrl + '/' + id);
  }

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.baseUrl);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
