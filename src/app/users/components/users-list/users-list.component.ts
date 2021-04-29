import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/user';
import {UserService} from '../../shared/user.service';
import {AuthService} from '../../../auth/shared/auth.service';
import {PermissionEnum} from '../../shared/permission.enum';
import {ResourceInfiniteListComponent} from '../../../core/shared/resource-infinite-list.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent extends ResourceInfiniteListComponent implements OnInit {
  currentUser: User;
  users: User[];
  canChangeRole = PermissionEnum.ChangeRoleUser;

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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.currentUser = this.authService.currentUserValue;
    this.users = [];

    super.init();
  }

  load(): void {
    super.load();

    if(!this.locked) {
      this.userService.getAllUsers(this.params)
        .then(users => {
          if(users.length === 0) {
            this.locked = true;
          } else {
            Array.prototype.push.apply(this.users, users);
          }
          this.loaded = true;
        })
        .catch(err => console.log('Error loading list of users : ' + err));
    }
  }

  changeRole(userUuid: string): void {
    this.router.navigate(['/users/role'], { queryParams: { uuid: userUuid } });
  }
}
