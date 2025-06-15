import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
  CommentEnum,
  LikeContentEnum,
  LikeDTO,
  PostEnum,
  UserDTO,
  Like,
  Environment,
} from 'travel-and-trek-app-core/dist/app-core';
import {
  setLoadingOnRequest,
  SkeletonService,
} from '../common/skeleton.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  private apiUrl = Environment.baseUrl + '/api/like';

  constructor(
    private http: HttpClient,
    private skeletonService: SkeletonService
  ) {}

  findCountLikesByPost(
    id: string,
    value: PostEnum | CommentEnum,
    type: string
  ): Observable<LikeDTO | null> {
    const params = new HttpParams()
      .append('id', id)
      .append('value', value)
      .append('type', type);
    return this.http
      .get<LikeDTO>(`${this.apiUrl}/post/number`, { params })
      .pipe(
        switchMap((data) => {
          if (!data) {
            return of(data);
          }
          return of(data).pipe(setLoadingOnRequest(this.skeletonService));
        })
      );
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
    return this.http
      .get<UserDTO[]>(`${this.apiUrl}/post/userDTO`, { params })
      .pipe(
        switchMap((data) => {
          if (Array.isArray(data) && data.length === 0) {
            return of(data);
          }
          return of(data).pipe(setLoadingOnRequest(this.skeletonService));
        })
      );
  }

  postLike(like: Like): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/save`, like)
      .pipe(setLoadingOnRequest(this.skeletonService));
  }
}
