import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from './pages/articles/articles.component';
import {ArticleFormComponent} from './pages/article-form/article-form.component';
import {ArticleComponent} from './pages/article/article.component';

const routes: Routes = [
  { path: 'show', component: ArticleComponent},
  { path: 'all', component: ArticlesComponent},
  { path: 'edit', component: ArticleFormComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticlesRootingModule { }
