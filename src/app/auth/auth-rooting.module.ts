import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthFormComponent} from './auth-form/auth-form.component';
import {RegisterFormComponent} from './register-form/register-form.component';
import {NotAuthGuard} from './shared/not-auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthFormComponent},
  { path: 'register', component: RegisterFormComponent, canActivate: [NotAuthGuard]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRootingModule { }
