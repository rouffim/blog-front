import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthRootingModule} from './auth-rooting.module';
import {AuthFormComponent} from './auth-form/auth-form.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    AuthRootingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
