import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/shared/auth.service';
import {User} from './user';
import {Article} from '../../articles/shared/article';
import {ResourceParams} from '../../core/shared/resource-params';
import {Observable} from 'rxjs';
import {UtilsService} from '../../utils/shared/utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private utils: UtilsService
  ) { }

  getUser(uuid: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/api/users/${uuid}`, this.auth.setHttpRequestOptions())
        .subscribe(
          response => resolve(this.responseToUser(response.data)),
          err => reject(err)
        );
    });
  }

  getAllUsers(params?: ResourceParams): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/api/users`, this.auth.setHttpRequestOptions(params))
        .subscribe(
          response => resolve(this.responseToUsers(response.data)),
          err => reject(err)
        );
    });
  }

  saveUser(user, userUuid?: string): Observable<any> {
    // user http.put or http.patch doesn't work with form-data for laravel api
    const urlFollow = userUuid ? `${userUuid}?_method=PUT` : '';
    return this.http.post<any>(`${environment.apiUrl}/api/users/${urlFollow}`, user, this.auth.setHttpRequestOptions());
  }

  deleteArticle(userUuid: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/users/${userUuid}`, this.auth.setHttpRequestOptions());
  }

  private responseToUsers(usersJson: any): User[] {
    return usersJson.map(userJson => this.responseToUser(userJson));
  }

  private responseToUser(userJson: any): User {
    return new User(userJson);
  }
}
