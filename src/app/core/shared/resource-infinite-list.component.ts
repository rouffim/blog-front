import {ResourceParams} from './resource-params';

export abstract class ResourceInfiniteListComponent {
  params: ResourceParams;
  loaded: boolean;
  locked: boolean;
  protected _page = 1;
  protected _initPage?: number;
  protected _perPage?: number;
  protected _sort?: string;
  protected _sortType?: string;
  protected _search?: string;

  init(): void {
    this.loaded = false;
    this.locked = false;
    if(!this.params) {
      this.params = new ResourceParams();
    }

    if(this._initPage) {
      this._page = this._initPage;
    }

    this.load();
  }

  load(): void {
    if(!this.locked) {
      this.loaded = false;
      this.params.page = this._page;
      this.params.perPage = this._perPage;
      this.params.sort = this._sort;
      this.params.sortType = this._sortType;
      this.params.search = this._search;
    }
  }

}
