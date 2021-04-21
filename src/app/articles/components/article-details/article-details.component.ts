import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../shared/article';
import {ArticleService} from '../../shared/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {
  error = false;
  article: Article;

  @Input() articleUuid: string;

  constructor(
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.articleService.getArticle(this.articleUuid)
      .then(article => this.article = article)
      .catch(err => {
        this.error = true;
        console.log('Error loading article with uuid : ' + this.articleUuid + ', error : ' + err);
      });
  }

}
