import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticlesComponent} from './pages/articles/articles.component';
import {ArticleFormComponent} from './pages/article-form/article-form.component';
import {ArticleComponent} from './pages/article/article.component';
import {PermissionEnum} from '../users/shared/permission.enum';
import {AuthGuard} from '../auth/shared/auth.guard';

const routes: Routes = [
  { path: 'show', component: ArticleComponent},
  { path: 'all', component: ArticlesComponent},
  {
    path: 'edit',
    component: ArticleFormComponent,
    canActivate: [AuthGuard],
    data: {
      permission: PermissionEnum.EditOwnArticle
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticlesRootingModule { }
