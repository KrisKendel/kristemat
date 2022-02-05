import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../models/app-user';
import { Enviroment } from '../models/enviroment';
import { Advisor } from '../models/advisor';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  public uri = Enviroment.server + '/api/Users';
  public uriUser = Enviroment.server + '/api/Users/profile';
  public user: AppUser;

  constructor(private http: HttpClient) { }

  getAll(): Observable<AppUser[]> {
    return this.http.get<AppUser[]>(`${this.uri}`);
  }

  getAdvisorById(id: string): Observable<Advisor> {
    return this.http.get<Advisor>(`${this.uri}/${id}`);
  }

  getUserById(id: string): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.uri}/${id}`);
  }

  getActiveUser(): Observable<AppUser> {
    return this.http.get<AppUser>(`${this.uriUser}`);
  }

  editUser(value: AppUser): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.uriUser}`, value);
  }
}
