import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
  Comment,
  CommentEnum,
  CommentId,
  Environment,
  PostEnum,
} from 'travel-and-trek-app-core/dist/app-core';
import {
  setLoadingOnRequest,
  SkeletonService,
} from '../common/skeleton.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = Environment.baseUrl + '/api/comment';

  constructor(
    private http: HttpClient,
    private skeletonService: SkeletonService
  ) {}

  findCountCommentsByPost(
    id: string,
    type: PostEnum | CommentEnum
  ): Observable<number> {
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http.get<number>(`${this.apiUrl}/post/number`, { params }).pipe(
      switchMap((data) => {
        if (!data) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
  }

  findCommentsByPost(
    id: string,
    type: PostEnum | CommentEnum
  ): Observable<Comment[]> {
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http.get<Comment[]>(`${this.apiUrl}/post`, { params }).pipe(
      switchMap((data) => {
        if (Array.isArray(data) && data.length === 0) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
  }

  postComment(comment: Comment): Observable<void> {
    return this.http
      .post<void>(`${this.apiUrl}/save`, comment)
      .pipe(setLoadingOnRequest(this.skeletonService));
  }

  findCommentById(id: CommentId): Observable<Comment | null> {
    return this.http.get<Comment>(`${this.apiUrl}/find/id?id=${id}`).pipe(
      switchMap((data) => {
        if (!data) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
  }
}
