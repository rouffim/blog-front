import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthFormComponent} from '../auth/auth-form/auth-form.component';
import {ArticlesComponent} from '../articles/pages/articles/articles.component';
import {UsersComponent} from './pages/users/users.component';

const routes: Routes = [
  { path: 'all', component: UsersComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UsersRootingModule { }
