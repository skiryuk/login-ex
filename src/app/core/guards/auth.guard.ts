import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  canActivate(): boolean {
    if (this._authService.isAuthorized()) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }
}
