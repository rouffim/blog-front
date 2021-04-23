import {HttpParams} from '@angular/common/http';

export class ResourceParams {
  private _page?: number;
  private _search?: string;
  private _perPage?: number;
  private _sort?: string;
  private _sortType?: string;

  constructor() {
  }

  public toHttpParams(): HttpParams {
    let httpParams = new HttpParams();

    if(this.page)
      httpParams = httpParams.append('page', String(this.page));

    if(this.perPage)
      httpParams = httpParams.append('perPage', String(this.perPage));

    if(this.sort)
      httpParams = httpParams.append('sort', this.sort);

    if(this.sortType)
      httpParams = httpParams.append('sortType', this.sortType);

    if(this.search)
      httpParams = httpParams.append('search', this.search);

    return httpParams;
  }


  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get search(): string {
    return this._search;
  }

  set search(value: string) {
    this._search = value;
  }

  get perPage(): number {
    return this._perPage;
  }

  set perPage(value: number) {
    this._perPage = value;
  }

  get sort(): string {
    return this._sort;
  }

  set sort(value: string) {
    this._sort = value;
  }

  get sortType(): string {
    return this._sortType;
  }

  set sortType(value: string) {
    this._sortType = value;
  }
}
