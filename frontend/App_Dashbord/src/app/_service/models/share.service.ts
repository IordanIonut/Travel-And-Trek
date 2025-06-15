import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
  CommentEnum,
  Environment,
  PostEnum,
  Share,
  ShareId,
  UserDTO,
} from 'travel-and-trek-app-core/dist/app-core';
import {
  setLoadingOnRequest,
  SkeletonService,
} from '../common/skeleton.service';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private apiUrl = Environment.baseUrl + '/api/share';

  constructor(
    private http: HttpClient,
    private skeletonService: SkeletonService
  ) {}

  getPostByProfile(
    name: string,
    index: number,
    number: number
  ): Observable<Share[]> {
    return this.http
      .get<Share[]>(
        `${this.apiUrl}/find?name=${name}&index=${index}&number=${number}`
      )
      .pipe(
        switchMap((data) => {
          if (Array.isArray(data) && data.length === 0) {
            return of(data);
          }
          return of(data).pipe(setLoadingOnRequest(this.skeletonService));
        })
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
    return this.http.get<Share[]>(`${this.apiUrl}/get/group`, { params }).pipe(
      switchMap((data) => {
        if (Array.isArray(data) && data.length === 0) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
  }

  findCountSharesByPost(
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

  findUsersLikesByPost(
    name: string,
    id: string,
    type: PostEnum | CommentEnum
  ): Observable<UserDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('id', id)
      .append('type', type);
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

  getSharetById(id: ShareId): Observable<Share | null> {
    return this.http.get<Share>(`${this.apiUrl}/get?id=${id}`).pipe(
      switchMap((data) => {
        if (!data) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
  }
}
