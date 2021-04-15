import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/user';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers()
      .then(users => this.users = users)
      .catch(err => console.log('Error loading list of users : ' + err));
  }

}
