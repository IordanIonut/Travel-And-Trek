import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../_environment/environment.local';
import { CommentEnum, Like, LikeContentEnum, LikeDTO, PostEnum, UserDTO } from '../../_model/public-api';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private apiUrl = Environment.baseUrl + '/api/like';

  constructor(private http: HttpClient) {}

  findCountLikesByPost(
    id: string,
    value: PostEnum | CommentEnum,
    type: string
  ): Observable<LikeDTO> {
    const params = new HttpParams()
      .append('id', id)
      .append('value', value)
      .append('type', type);
    return this.http.get<LikeDTO>(`${this.apiUrl}/post/number`, { params });
  }

  findUsersLikesByPost(
    name: string,
    id: string,
    type: PostEnum | CommentEnum,
    content: LikeContentEnum | null
  ): Observable<UserDTO[]> {
    let params = new HttpParams()
      .append('name', name)
      .append('id', id)
      .append('type', type);
    if (content !== null && content !== undefined) {
      params = params.append('content', content);
    }
    return this.http.get<UserDTO[]>(`${this.apiUrl}/post/userDTO`, { params });
  }

  postLike(like: Like): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save`, like);
  }
}
