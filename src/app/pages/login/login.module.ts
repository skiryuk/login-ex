import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NzButtonModule, NzFormModule, NzInputModule } from 'ng-zorro-antd';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(options),
    NzFormModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class LoginModule { }
