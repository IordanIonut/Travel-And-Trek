import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Environment, Story } from 'travel-and-trek-app-core/dist/app-core';
import {
  setLoadingOnRequest,
  SkeletonService,
} from '../common/skeleton.service';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = Environment.baseUrl + '/api/story';

  constructor(
    private http: HttpClient,
    private skeletonService: SkeletonService
  ) {}

  findFriendsStory(
    name: string,
    page: number,
    size: number
  ): Observable<Story[]> {
    return this.http
      .get<Story[]>(`${this.apiUrl}/get?name=${name}&page=${page}&size=${size}`)
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
