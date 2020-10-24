import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private _authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('api/') && this._authService.isAuthorized()) {
      req = req.clone({
        setHeaders: {
          AuthorizationToken: this._authService.getToken(),
        }
      });
    }
    return next.handle(req);
  }
}
