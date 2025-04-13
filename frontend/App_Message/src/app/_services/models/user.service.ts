import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/_type/models/dto/user-dto';
import { Message } from 'src/app/_type/models/message';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = Environment.baseUrl + '/api/user';
  constructor(private http: HttpClient) {}

  findUserByName(name: String): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/info?name=${name}`);
  }
}
