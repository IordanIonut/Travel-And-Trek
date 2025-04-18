import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CommentEnum,
  Environment,
  PostEnum,
  Share,
  ShareId,
  UserDTO,
} from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private apiUrl = Environment.baseUrl + '/api/share';

  constructor(private http: HttpClient) {}

  getPostByProfile(
    name: string,
    index: number,
    number: number
  ): Observable<Share[]> {
    return this.http.get<Share[]>(
      `${this.apiUrl}/find?name=${name}&index=${index}&number=${number}`
    );
  }

  getAllSharesByGroup(
    name: string,
    index: number,
    number: number
  ): Observable<Share[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('index', index)
      .append('number', number);
    return this.http.get<Share[]>(`${this.apiUrl}/get/group`, { params });
  }

  findCountSharesByPost(
    id: string,
    type: PostEnum | CommentEnum
  ): Observable<number> {
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http.get<number>(`${this.apiUrl}/post/number`, { params });
  }

  findUsersLikesByPost(
    name: string,
    id: string,
    type: PostEnum | CommentEnum
  ): Observable<UserDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('id', id)
      .append('type', type);
    return this.http.get<UserDTO[]>(`${this.apiUrl}/post/userDTO`, { params });
  }

  getSharetById(id: ShareId): Observable<Share> {
    return this.http.get<Share>(`${this.apiUrl}/get?id=${id}`);
  }
}
