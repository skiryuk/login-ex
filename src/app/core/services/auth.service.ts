import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { AuthRequest } from '../models/auth.request';
import { AuthResponse } from '../models/auth.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _login$: Subject<AuthResponse> = new Subject();
  public readonly login$: Observable<AuthResponse> = this._login$.asObservable();

  constructor(
    private _http: HttpClient,
    private _toastrService: ToastrService
  ) { }

  public login(req: AuthRequest): void {
    // For Real Use
    /*this._http.post<AuthResponse>('/api/user/auth/admin', req)
      .pipe(tap(res => window.localStorage.setItem('auth', JSON.stringify(res))))
      .subscribe(res =>
        this._login$.next(res),
        (e: HttpErrorResponse) => {
                this._toastrService.error(e.error.message);
              });*/

    // For Mock Use
    of(JSON.parse('{"userId":9999999999,"token":"b0172e28ad3e38b67a686e0666bcecdf28682719a7cf287ccb21c39933041101","userName":"SERGEY"}'))
      .pipe(tap(res => window.localStorage.setItem('auth', JSON.stringify(res))))
      .subscribe(res =>
          this._login$.next(res),
        (e: HttpErrorResponse) => {
          this._toastrService.error(e.error.message);
        });

    // For Error
    of(JSON.parse('{"message":"Пользователь с указанным номером телефона не зарегистрирован. Пожалуйста, укажите другой номер телефона","code":103,"ident":"USER_NOT_EXIST"}'))
      .pipe(tap(res => window.localStorage.setItem('auth', JSON.stringify(res))))
      .subscribe(res =>
          this._login$.next(res),
        (e: HttpErrorResponse) => {
          this._toastrService.error(e.error.message);
        });
  }

  public logout(): void {
    // For Real Use
    /*this._http.post<AuthResponse>('/api/user/logout', null)
      .pipe(tap(() => window.localStorage.removeItem('auth')))
      .subscribe(() =>
          this._login$.next(null),
        (e: HttpErrorResponse) => {
                this._toastrService.error(e.error.message);
              });*/

    // For Mock Use
    of(null)
      .pipe(tap(() => window.localStorage.removeItem('auth')))
      .subscribe(() =>
          this._login$.next(null),
        (e: HttpErrorResponse) => {
          this._toastrService.error(e.error.message);
        });
  }

  public getToken(): string {
    const auth = window.localStorage.getItem('auth');
    return auth ? (JSON.parse(auth) as AuthResponse).token : '';
  }

  public getUserName(): string {
    const auth = window.localStorage.getItem('auth');
    return auth ? (JSON.parse(auth) as AuthResponse).userName : null;
  }

  public getUserId(): number {
    const auth = window.localStorage.getItem('auth');
    return auth ? (JSON.parse(auth) as AuthResponse).userId : null;
  }

  public isAuthorized(): boolean {
    return !!this.getToken();
  }
}
