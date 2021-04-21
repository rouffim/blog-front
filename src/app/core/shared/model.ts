export abstract class Model {
  private _uuid: string;
  private _createdAt: Date;
  private _updatedAt: Date;


  protected constructor(obj?: any) {
    if(obj) {
      this.uuid = obj.uuid;
      this.createdAt = new Date(obj.created_at);
      this.updatedAt = new Date(obj.updated_at);
    }
  }


  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }
}
