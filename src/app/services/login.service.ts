import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enviroment } from '../models/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  uri = Enviroment.server + '/api/Auth/login';

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
