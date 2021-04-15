import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from '../articles/pages/articles/articles.component';
import {AuthFormComponent} from './auth-form/auth-form.component';

const routes: Routes = [
  { path: 'login', component: AuthFormComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRootingModule { }
