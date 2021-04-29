import { Injectable } from '@angular/core';
import {User} from '../../users/shared/user';
import {BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ResourceParams} from '../../core/shared/resource-params';

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

  setHttpRequestOptions(params?: any): {
      headers: HttpHeaders,
      params?: HttpParams;
    } {
    let p: HttpParams;

    if(params) {
      if(params instanceof HttpParams) {
        p = params;
      } else if(params instanceof ResourceParams) {
        p = params.toHttpParams();
      }
    }

    return {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin':'*',
        'Authorization': this.currentUserValue != null ? `Bearer ${this.currentUserValue.token}` : ''
      }),
      params: p ? p : null
    };
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { email, password }, this.setHttpRequestOptions())
      .pipe(map(userAndToken => {
        const user = userAndToken['user'];
        user.token = userAndToken['token'].split('|')[1];
        return this.updateUser(user);
      }));
  }

  register(registration: FormData): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/register`, registration, this.setHttpRequestOptions());
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateUser(user: any): User {
    const usr: User = new User(user);
    this.currentUserSubject.next(usr);

    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', usr.toJson());

    return usr;
  }
}
