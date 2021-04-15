import { Injectable } from '@angular/core';
import {User} from '../../users/shared/user';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  protected currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient
  ) {
    const userJson = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<User>(userJson ? new User(userJson) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getHeaderWithToken(): { headers: HttpHeaders; } {
    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Authorization': this.currentUserValue != null ? `Bearer ${this.currentUserValue.token}` : ''
      })
    };
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { email, password }, this.getHeaderWithToken())
      .pipe(map(userAndToken => {
        const user = userAndToken['user'];
        user.token = userAndToken['token'].split('|')[1];

        const usr: User = new User(user);
        this.currentUserSubject.next(usr);

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', usr.toJson());
        return usr;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}