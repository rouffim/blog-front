import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../auth/shared/auth.service';
import {User} from './user';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getAllUsers(): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      this.http.get<any>(`${environment.apiUrl}/api/users`, this.auth.setHttpRequestOptions())
        .subscribe(
          response => resolve(this.responseToUsers(response.data)),
          err => reject(err)
        );
    });
  }

  private responseToUsers(usersJson: any): User[] {
    return usersJson.map(userJson => this.responseToUser(userJson));
  }

  private responseToUser(userJson: any): User {
    return new User(userJson);
  }
}
