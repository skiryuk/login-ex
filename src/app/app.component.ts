import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _loginSub: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._loginSub = this._authService.login$
      .subscribe(res => {
        if (res) {
          this._router.navigate(['/main']);
        } else {
          this._router.navigate(['/login']);
        }
      });
  }

  ngOnDestroy(): void {
    this._loginSub.unsubscribe();
  }
}
