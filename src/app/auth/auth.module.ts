import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRootingModule} from './auth-rooting.module';
import {AuthFormComponent} from './auth-form/auth-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterFormComponent} from './register-form/register-form.component';
import {UtilsModule} from '../utils/utils.module';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';



@NgModule({
  declarations: [
    AuthFormComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    AuthRootingModule,
    ReactiveFormsModule,
    UtilsModule,
    RxReactiveFormsModule
  ]
})
export class AuthModule { }
