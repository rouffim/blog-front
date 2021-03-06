import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ArticleComponent } from './pages/article/article.component';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import {ArticlesRootingModule} from './articles-rooting.module';
import {ArticleFormComponent} from './pages/article-form/article-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {DateAgoPipe} from '../app/pipes/date-ago.pipe';
import {UtilsModule} from '../utils/utils.module';
import {ArticleBodyPipe} from './pipes/article-body.pipe';



@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    ArticleDetailsComponent,
    ArticlesListComponent,
    ArticleFormComponent,
    DateAgoPipe,
    ArticleBodyPipe
  ],
  exports: [
    ArticleDetailsComponent,
    ArticlesListComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRootingModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    UtilsModule
  ]
})
export class ArticlesModule { }
