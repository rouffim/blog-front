import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import {ArticlesRootingModule} from './articles-rooting.module';
import {UsersListComponent} from '../users/components/users-list/users-list.component';
import {UserDetailsComponent} from '../users/components/user-details/user-details.component';



@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    ArticleDetailsComponent,
    ArticlesListComponent
  ],
  exports: [
    ArticleDetailsComponent,
    ArticlesListComponent
  ],
  imports: [
    CommonModule,
    ArticlesRootingModule
  ]
})
export class ArticlesModule { }
