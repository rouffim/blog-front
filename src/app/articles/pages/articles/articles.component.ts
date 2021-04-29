import { Component, OnInit } from '@angular/core';
import {ArticleSortEnum} from '../../shared/article-sort.enum';
import {SortTypeEnum} from '../../../core/shared/sort-type.enum';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  currentPage = 1;
  sort = ArticleSortEnum.UpdatedAt;
  sortType = SortTypeEnum.Desc;

  constructor() { }

  ngOnInit(): void {
  }

  onScrollDown(): void {
    this.currentPage++;
  }
}
