import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../shared/article.service';
import {Article} from '../../shared/article';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles: Article[];

  constructor(
    private articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    this.articleService.getAllArticles()
      .then(articles => this.articles = articles)
      .catch(err => console.log('Error loading list of articles : ' + err));
  }
}
