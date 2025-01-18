import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDTO } from 'src/app/_type/dto/group.dto';
import { SearchDTO } from 'src/app/_type/dto/search.dto';
import { Follow } from 'src/app/_type/models/follow';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private apiUrl = environment.baseUrl + '/follower';
  constructor(private http: HttpClient) {}

  postCreateFollower(follow: Follow): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save`, { 
      follower_user_id: {
        id: follow.follower_user_id.id 
      },
      follower_user_id_follower: {
        id: follow.follower_user_id_follower.id 
      },
      created_at: follow.created_at
    });
  }
  
}
