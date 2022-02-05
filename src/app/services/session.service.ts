import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enviroment } from '../models/enviroment';
import { SessionRequest } from '../models/session-request.model';
import { SessionResponse } from '../models/session.model';

@Injectable()
export class SessionService {
  uri = Enviroment.server + '/api/Sessions/request';
  availableUri = Enviroment.server + '/api/Sessions';
  acceptSuffix = '/accept';
  rejectSuffix = '/reject';

  constructor(private http: HttpClient) { }

  sessionRequestPost(data: SessionRequest): Observable<SessionRequest> {
    return this.http.post<SessionRequest>(`${this.uri}`, data);
  }

  setAvailableDate(data: SessionResponse): Observable<SessionResponse> {
    return this.http.post<SessionResponse>(`${this.availableUri}`, data);
  }

  rejectSessionRequest(data: SessionResponse): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(`${this.availableUri}/${data}${this.rejectSuffix}`);
  }

  acceptSessionRequest(data: SessionResponse): Observable<SessionResponse> {
    return this.http.get<SessionResponse>(`${this.availableUri}/${data}${this.acceptSuffix}`);
  }
}
