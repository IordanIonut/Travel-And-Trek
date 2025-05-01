import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';
import { Environment } from '../_environment/environment.local';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _jwt: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this._jwt.getToken(Environment.jwtToken);
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
