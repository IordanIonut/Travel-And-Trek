import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private base = Environment.baseUrl + '/api/sendEmail';
  constructor(private _http: HttpClient) {}

  sendMail(email: string): Observable<boolean> {
    return this._http.get<boolean>(`${this.base}/reset?email=${email}`);
  }
}
