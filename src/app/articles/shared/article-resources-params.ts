import {HttpParams} from '@angular/common/http';
import {ResourceParams} from '../../core/shared/resource-params';

export class ArticleResourceParams extends ResourceParams {
  private _isPinned?: boolean;

  constructor() {
    super();
  }

  public toHttpParams(): HttpParams {
    let httpParams = super.toHttpParams();

    if(this.isPinned !== undefined)
      httpParams = httpParams.append('is_pinned', String(this.isPinned ? 1 : 0));

    return httpParams;
  }


  get isPinned(): boolean {
    return this._isPinned;
  }

  set isPinned(value: boolean) {
    this._isPinned = value;
  }
}
