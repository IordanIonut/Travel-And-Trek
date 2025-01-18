import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchDTO } from 'src/app/_type/dto/search.dto';
import { UserProfileDTO } from 'src/app/_type/dto/user-profile.dto';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.baseUrl + '/user';

  constructor(private http: HttpClient) {}

  findUserByName(name: String): Observable<UserProfileDTO> {
    return this.http.get<UserProfileDTO>(`${this.apiUrl}/info?name=${name}`);
  }

  findSuggestersSearch(
    name: string,
    type: string,
    page: number,
    size: number
  ): Observable<SearchDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('type', type)
      .append('page', page)
      .append('size', size);
    return this.http.get<SearchDTO[]>(`${this.apiUrl}/suggesters`, { params });
  }

  findUsersAndFriendsByName(
    name: string,
    search: string,
    page: number,
    size: number
  ): Observable<UserDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('search', search)
      .append('page', page)
      .append('size', size);
    return this.http.get<UserDTO[]>(`${this.apiUrl}/suggesters/user`, {
      params,
    });
  }
}
