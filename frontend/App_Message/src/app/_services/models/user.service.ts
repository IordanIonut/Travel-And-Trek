import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/_type/models/dto/user-dto';
import { Message } from 'src/app/_type/models/message';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.baseUrl + '/user';
  constructor(private http: HttpClient) {}

  findUserByName(name: String): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/info?name=${name}`);
  }
}
