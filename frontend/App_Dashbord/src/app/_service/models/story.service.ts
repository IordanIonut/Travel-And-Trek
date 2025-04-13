import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment, Story } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = Environment.baseUrl + '/api/story';

  constructor(private http: HttpClient) {}

  findFriendsStory(
    name: string,
    page: number,
    size: number
  ): Observable<Story[]> {
    return this.http.get<Story[]>(
      `${this.apiUrl}/get?name=${name}&page=${page}&size=${size}`
    );
  }
}
