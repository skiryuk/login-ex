import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { NzButtonModule, NzFormModule, NzInputModule, NzModalModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { PhoneNumberPipe } from '../../core/pipes/phone-number.pipe';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [
    MainComponent,
    PhoneNumberPipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    AngularSvgIconModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NzIconModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule
  ]
})
export class MainModule { }
