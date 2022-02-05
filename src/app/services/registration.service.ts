import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { Enviroment } from '../models/enviroment';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  uri = Enviroment.server + '/api/Auth/register';
  users: AppUser[];

  constructor(private http: HttpClient) { }

  post(credentials): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(`${this.uri}`, credentials, options);
  }
}
