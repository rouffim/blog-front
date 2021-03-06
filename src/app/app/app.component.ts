import { Component, OnInit } from '@angular/core';
import {User} from '../users/shared/user';
import {AuthService} from '../auth/shared/auth.service';
import {PermissionEnum} from '../users/shared/permission.enum';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  permissionsEnum = PermissionEnum;
  user: User;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.auth.currentUserValue;
    this.auth.currentUser.subscribe(
      user => this.user = user
    );
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  login(): void {
    this.router.navigate(['/auth/login']);
  }

  editAccount(): void {
    this.router.navigate(['/users/edit'], {queryParams: {uuid: this.user.uuid}});
  }

  register(): void {
    this.router.navigate(['/auth/register']);
  }

  gotoTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
