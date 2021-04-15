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
    console.log(this.user);
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
