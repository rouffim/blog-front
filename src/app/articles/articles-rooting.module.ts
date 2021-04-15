import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from './pages/articles/articles.component';

const routes: Routes = [
  { path: 'all', component: ArticlesComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticlesRootingModule { }
