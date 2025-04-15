import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base = Environment.baseUrl + '/api/user';
  constructor(private _http: HttpClient) {}

  findUserByEmailVal(email: string): Observable<boolean> {
    return this._http.get<boolean>(`${this.base}/val/email?email=${email}`);
  }

  findUserByNameVal(name: string): Observable<boolean> {
    return this._http.get<boolean>(`${this.base}/val/name?name=${name}`);
  }

  updateUserPassword(email: string, password: string) {
    return this._http.put(
      `${this.base}/password/update?email=${email}&password=${password}`,
      null,
      { observe: 'response' }
    );
  }
}
