import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import {
  Environment,
  Follow,
  UserDTO,
} from 'travel-and-trek-app-core/dist/app-core';
import {
  setLoadingOnRequest,
  SkeletonService,
} from '../common/skeleton.service';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private apiUrl = Environment.baseUrl + '/api/follower';
  constructor(
    private http: HttpClient,
    private skeletonService: SkeletonService
  ) {}

  postCreateFollower(follow: Follow): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, follow).pipe(
      switchMap((data) => {
        if (!data) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
  }

  deleteFollower(follow: Follow): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/delete`, follow).pipe(
      switchMap((data) => {
        if (!data) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
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
    return this.http
      .get<UserDTO[]>(`${this.apiUrl}/find/follower`, { params })
      .pipe(
        switchMap((data) => {
          if (Array.isArray(data) && data.length === 0) {
            return of(data);
          }
          return of(data).pipe(setLoadingOnRequest(this.skeletonService));
        })
      );
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
    return this.http.get<UserDTO[]>(`${this.apiUrl}/find`, { params }).pipe(
      switchMap((data) => {
        if (Array.isArray(data) && data.length === 0) {
          return of(data);
        }
        return of(data).pipe(setLoadingOnRequest(this.skeletonService));
      })
    );
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
    return this.http
      .get<UserDTO[]>(`${this.apiUrl}/suggestion`, { params })
      .pipe(
        switchMap((data) => {
          if (Array.isArray(data) && data.length === 0) {
            return of(data);
          }
          return of(data).pipe(setLoadingOnRequest(this.skeletonService));
        })
      );
  }
}
