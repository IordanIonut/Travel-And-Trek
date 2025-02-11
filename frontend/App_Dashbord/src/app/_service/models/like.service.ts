import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import { LikeContentEnum } from 'src/app/_type/enum/like.content.enum';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private apiUrl = environment.baseUrl + '/like';

  constructor(private http: HttpClient) {}

  findCountLikesByPost(id: string, type: PostEnum): Observable<number> {
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http.get<number>(`${this.apiUrl}/post/number`, { params });
  }

  findUsersLikesByPost(
    name: string,
    id: string,
    type: PostEnum,
    content: LikeContentEnum | null,
  ): Observable<UserDTO[]> {
    let params = new HttpParams()
      .append('name', name)
      .append('id', id)
      .append('type', type)
    if (content !== null && content !== undefined) {
      params = params.append('content', content);
    }
    return this.http.get<UserDTO[]>(`${this.apiUrl}/post/userDTO`, { params });
  }
}
