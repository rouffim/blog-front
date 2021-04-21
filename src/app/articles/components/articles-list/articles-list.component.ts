import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from '../../shared/article.service';
import {Article} from '../../shared/article';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceParams} from '../../../core/shared/resource-params';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  params: ResourceParams;
  loaded: boolean;
  locked: boolean;
  articles: Article[];
  _page = 1;

  @Input() perPage?: number;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loaded = false;
    this.locked = false;
    this.params = new ResourceParams();
    this.articles = [];

    this.loadArticles();
  }

  loadArticles(): void {
    if(!this.locked) {
      this.loaded = false;
      this.params.page = this.page;
      this.params.perPage = this.perPage;

      this.articleService.getAllArticles(this.params)
        .then(articles => {
          if(articles.length === 0) {
            this.locked = true;
          } else {
            Array.prototype.push.apply(this.articles, articles);
          }
          this.loaded = true;
        })
        .catch(err => console.log('Error loading list of articles : ' + err));
    }
  }

  goToArticlePage(articleUuid: string): void {
    this.router.navigate(['/articles/show'], { queryParams: { uuid: articleUuid } });
  }

  get page(): number {
    return this._page;
  }

  @Input() set page(value: number) {
    if(this._page < value) {
      this._page = value;
      this.loadArticles();
    }
  }
}
