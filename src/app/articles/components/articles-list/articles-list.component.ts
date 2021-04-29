import {Component, Input, OnInit} from '@angular/core';
import {ArticleService} from '../../shared/article.service';
import {Article} from '../../shared/article';
import {ActivatedRoute, Router} from '@angular/router';
import {ResourceInfiniteListComponent} from '../../../core/shared/resource-infinite-list.component';
import {ResourceParams} from '../../../core/shared/resource-params';
import {ArticleResourceParams} from '../../shared/article-resources-params';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
  inputs: ['page', 'sortType', 'sort', 'perPage']
})
export class ArticlesListComponent extends ResourceInfiniteListComponent implements OnInit {
  private _isPinned: boolean;
  articles: Article[];

  @Input() set page(value: number) {
    if(this._page < value) {
      this._page = value;
      this.load();
    }
  }
  @Input() set initPage(value: number) {
    this._initPage = value;
  }
  @Input() set perPage(value: number) {
    this._perPage = value;
  }
  @Input() set sort(value: string) {
    this._sort = value;
  }
  @Input() set sortType(value: string) {
    this._sortType = value;
  }
  @Input() set search(value: string) {
    this._search = value;
  }
  @Input() set isPinned(value: boolean) {
    this._isPinned = value;
  }
  @Input() withLoading = true;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.articles = [];
    this.params = new ArticleResourceParams();

    super.init();
  }

  load(): void {
    super.load();

    if(!this.locked) {
      (this.params as ArticleResourceParams).isPinned = this._isPinned;

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
}
