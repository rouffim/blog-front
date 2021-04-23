import { Component, OnInit } from '@angular/core';
import {ArticleSortEnum} from '../articles/shared/article-sort.enum';
import {SortTypeEnum} from '../core/shared/sort-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sort = ArticleSortEnum.UpdatedAt;
  sortType = SortTypeEnum.Desc;
  perPage = 5;

  constructor() { }

  ngOnInit(): void {

  }
}
