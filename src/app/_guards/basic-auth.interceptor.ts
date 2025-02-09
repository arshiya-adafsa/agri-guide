import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        let token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `${token}`,
                    'fetchAll': 'false'
                }
            });
        }else{
            request = request.clone({
                setHeaders: { 
                    'FetchAll': 'false'
                }
            });
        }
        return next.handle(request);
    }
}