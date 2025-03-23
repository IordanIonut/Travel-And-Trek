import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment.local';
import { User } from '../_components/_model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = Environment.baseUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/test/login`, {
      email,
      password,
    });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/test/register`, user);
  }
}
