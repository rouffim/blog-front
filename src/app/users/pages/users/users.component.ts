import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  currentPage = 1;

  constructor() { }

  ngOnInit(): void {
  }

  onScrollDown(): void {
    this.currentPage++;
  }
}
