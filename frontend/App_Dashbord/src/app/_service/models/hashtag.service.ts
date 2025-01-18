import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import { Post } from 'src/app/_type/models/post';
import { Share } from 'src/app/_type/models/share';
import { User } from 'src/app/_type/models/user';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HashtagService {
  private apiUrl = environment.baseUrl + '/hashtags';

  constructor(private http: HttpClient) {}

  getPostByTag(
    hashtags: string[],
    index: number,
    number: number
  ): Observable<Post[]> {
    let params = new HttpParams()
      .set('index', index.toString())
      .set('number', number.toString());
    hashtags.forEach((tag) => {
      params = params.append('hashtags', tag);
    });
    return this.http.get<Post[]>(`${this.apiUrl}/get/post`, { params });
  }

  getUserByTag(
    name: string,
    hashtags: string[],
    index: number,
    number: number
  ): Observable<UserDTO[]> {
    let params = new HttpParams()
      .set('name', name)
      .set('index', index.toString())
      .set('number', number.toString());
    hashtags.forEach((tag) => {
      params = params.append('hashtags', tag);
    });
    return this.http.get<UserDTO[]>(`${this.apiUrl}/get/user`, { params });
  }
}
