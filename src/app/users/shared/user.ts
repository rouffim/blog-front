import {Model} from '../../core/shared/model';


export class User extends Model {
  private _email: string;
  private _name: string;
  private _password: string;
  private _passwordConfirm: string;
  private _role: number;
  private _image: string;
  private _token: string;
  private _permissions: Array<string>;


  constructor(obj?: any) {
    super(obj);

    if(obj) {
      this.email = obj.email;
      this.name = obj.name;
      this.role = obj.role;
      this.image = obj.image;
      this.token = obj.token;
      this.permissions = obj.permissions;
    }
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get role(): number {
    return this._role;
  }

  set role(value: number) {
    this._role = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get passwordConfirm(): string {
    return this._passwordConfirm;
  }

  set passwordConfirm(value: string) {
    this._passwordConfirm = value;
  }

  get image(): string {
    return this._image;
  }

  set image(value: string) {
    this._image = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get permissions(): Array<string> {
    if(!Array.isArray(this._permissions)) {
      this._permissions = [];
    }
    return this._permissions;
  }

  set permissions(value: Array<string>) {
    this._permissions = value;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }

  toJson(): string {
    const obj = {
      uuid : this.uuid,
      email : this.email,
      name : this.name,
      role : this.role,
      token : this.token,
      image : this.image,
      permissions : this.permissions,
      created_at : this.createdAt,
      updated_at : this.updatedAt,
    };
    return JSON.stringify(obj);
  }
}
