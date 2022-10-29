export interface UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}

export class User {
  public email: string;
  public id: string;
  // tslint:disable-next-line:variable-name
  private readonly _token: string;
  // tslint:disable-next-line:variable-name
  private readonly _tokenExpirationDate: Date;

  constructor(email: string, id: string, token: string, tokenExpirationDate: Date) {
    this.email = email;
    this.id = id;
    this._token = token;
    this._tokenExpirationDate = tokenExpirationDate;
  }

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
