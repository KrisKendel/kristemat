import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private userName = 'kristijan';
    private authToken = '...'

    constructor() {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                Auhorisation: 'Basic' + btoa(this.userName + ':' + this.authToken)
            }
        });
        return next.handle(request);
    }
 }
