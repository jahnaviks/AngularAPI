import { HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class interceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        const authReq = req.clone({
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        });
        return next.handle(authReq);
        }
        constructor() {
        }
}