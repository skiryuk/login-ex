import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this._buildForm();
  }

  private _buildForm(): void {
    this.loginForm = this._fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  public onLogin(): void {
    this._authService.login({
      userId: this.loginForm.get('login').value,
      pass: this.loginForm.get('password').value,
      deviceId: 'web',
      deviceType: 'web'
    });
  }
}
