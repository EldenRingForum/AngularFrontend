import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const headers = req.headers
            .set('Content-Type', 'application/json')

        const authReq = req.clone({ headers, withCredentials: true });
        console.log(authReq)
        return next.handle(authReq);
    }
}