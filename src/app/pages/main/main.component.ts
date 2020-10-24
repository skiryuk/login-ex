import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  public isVisibleBackButton$: Observable<boolean>;

  public get userName(): string {
    return this._authService.getUserName();
  }

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location
  ) {
  }

  ngOnInit(): void {

    this.isVisibleBackButton$ = merge(
      this._route.params,
      this._router.events
        .pipe(filter(event => event instanceof NavigationEnd))
    )
      .pipe(
        map(() => {
          return !this._router.url.startsWith('/main/overview') &&
            !this._router.url.startsWith('/login');
        })
      );
  }

  public onLogout(): void {
    this._authService.logout();
  }

  public onBack(): void {
    this._location.back();
  }
}
