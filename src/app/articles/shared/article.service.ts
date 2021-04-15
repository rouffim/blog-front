import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/shared/auth.service';
import {environment} from '../../../environments/environment';
import {Article} from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getAllArticles(sort?: string): Promise<Article[]> {
    return new Promise(async (resolve, reject) => {
      const params = sort ? '?sort=' + sort : '';

      this.http.get<any>(`${environment.apiUrl}/api/articles${params}`, this.auth.getHeaderWithToken())
        .subscribe(
          response => resolve(this.responseToArticles(response.data)),
          err => reject(err)
        );
    });
  }

  private responseToArticles(articlesJson: any): Article[] {
    return articlesJson.map(articleJson => this.responseToArticle(articleJson));
  }

  private responseToArticle(articleJson: any): Article {
    return new Article(articleJson);
  }
}

