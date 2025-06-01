import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../_environment/environment.local';
import { Follow, UserDTO } from '../../_model/public-api';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private apiUrl = Environment.baseUrl + '/api/follower';
  constructor(private http: HttpClient) {}

  postCreateFollower(follow: Follow): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, {
      follower_user_id: {
        id: follow.follower_user_id.id,
      },
      follower_user_id_follower: {
        id: follow.follower_user_id_follower.id,
      },
      created_at: follow.created_at,
    });
  }

  findUsersByFollowerStatus(
    name: string,
    status: string,
    page: number,
    size: number
  ): Observable<UserDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('status', status)
      .append('page', page)
      .append('size', size);
    return this.http.get<UserDTO[]>(`${this.apiUrl}/find/follower`, { params });
  }

  findUsersFollowerByStatus(
    name: string,
    status: string,
    page: number,
    size: number
  ): Observable<UserDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('status', status)
      .append('page', page)
      .append('size', size);
    return this.http.get<UserDTO[]>(`${this.apiUrl}/find`, { params });
  }

  findUserSuggestions(
    name: string,
    hashtags: string[],
    index: number,
    number: number
  ): Observable<UserDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('hashtags', hashtags.map((item) => item).join(','))
      .append('index', index)
      .append('number', number);
    return this.http.get<UserDTO[]>(`${this.apiUrl}/suggestion`, { params });
  }
}
