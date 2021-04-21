import {Model} from '../../core/shared/model';
import {User} from '../../users/shared/user';


export class Article extends Model {
  private _title: string;
  private _excerpt?: string;
  private _body: string;
  private _image?: string;
  private _nbViews: number;
  private _isPinned: boolean;
  private _user: User;


  constructor(obj?: any, user?: User) {
    super(obj);

    if(obj) {
      this.title = obj.title;
      this.excerpt = obj.excerpt;
      this.body = obj.body;
      this.image = obj.image;
      this.nbViews = obj.nb_views;
      this.isPinned = obj.is_pinned;
      this.user = user ? user : new User(obj.user);
    }
  }


  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get excerpt(): string {
    return this._excerpt;
  }

  set excerpt(value: string) {
    this._excerpt = value;
  }

  get body(): string {
    return this._body;
  }

  set body(value: string) {
    this._body = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get nbViews(): number {
    return this._nbViews;
  }

  set nbViews(value: number) {
    this._nbViews = value;
  }

  get isPinned(): boolean {
    return this._isPinned;
  }

  set isPinned(value: boolean) {
    this._isPinned = value;
  }

  get user(): User {
    return this._user;
  }

  set user(value: User) {
    this._user = value;
  }

  toJson(): string {
    const obj = {
      uuid : this.uuid,
      title : this.title,
      excerpt : this.excerpt,
      body : this.body,
      image : this.image,
      isPinned : this.isPinned,
      created_at : this.createdAt,
      updated_at : this.updatedAt,
    };
    return JSON.stringify(obj);
  }
}
