import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable, NEVER } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedReq = request.clone({});
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    });

    if (request.method === 'DELETE') {
      if (!confirm('Are you sure?')) {
        return NEVER;
      }
    }
    return next.handle(modifiedReq);
  }
}
