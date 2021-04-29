import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../auth/shared/auth.service';
import {environment} from '../../../environments/environment';
import {Article} from './article';
import {Observable} from 'rxjs';
import {ResourceParams} from '../../core/shared/resource-params';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {
  }

  getArticle(uuid: string): Promise<Article> {
    return new Promise(async (resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/api/articles/${uuid}`, this.auth.setHttpRequestOptions())
        .subscribe(
          response => resolve(this.responseToArticle(response.data)),
          err => reject(err)
        );
    });
  }

  getAllArticles(params?: ResourceParams): Promise<Article[]> {
    return new Promise(async (resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/api/articles`, this.auth.setHttpRequestOptions(params))
        .subscribe(
          response => resolve(this.responseToArticles(response.data)),
          err => reject(err)
        );
    });
  }

  saveArticle(article: FormData, articleUuid?: string): Observable<any> {
    // user http.put or http.patch doesn't work with form-data for laravel api
    const urlFollow = articleUuid ? `${articleUuid}?_method=PUT` : '';
    return this.http.post<any>(`${environment.apiUrl}/api/articles/${urlFollow}`, article, this.auth.setHttpRequestOptions());
  }

  deleteArticle(articleUuid: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/articles/${articleUuid}`, this.auth.setHttpRequestOptions());
  }

  private responseToArticles(articlesJson: any): Article[] {
    return articlesJson.map(articleJson => this.responseToArticle(articleJson));
  }

  private responseToArticle(articleJson: any): Article {
    return new Article(articleJson);
  }
}

