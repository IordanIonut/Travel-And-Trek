import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from 'src/app/_type/models/story';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private apiUrl = environment.baseUrl + '/story';

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
