import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { Hastag } from 'src/app/_type/models/hashtag';
import { Post } from 'src/app/_type/models/post';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.baseUrl + '/post';
  constructor(private http: HttpClient) {}

  getPostByProfileType(
    name: string,
    type: PostEnum,
    index: number,
    number: number
  ): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.apiUrl}/find/type?name=${name}&type=${type}&index=${index}&number=${number}`
    );
  }

  getPostByProfile(
    name: string,
    index: number,
    number: number
  ): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.apiUrl}/find?name=${name}&index=${index}&number=${number}`
    );
  }

  getPostByUserTag(
    name: string,
    index: number,
    number: number
  ): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.apiUrl}/find/tags?name=${name}&index=${index}&number=${number}`
    );
  }

  getPostBySearch(
    search: string,
    index: number,
    size: number
  ): Observable<Post[]> {
    const params = new HttpParams()
      .append('search', search)
      .append('index', index)
      .append('number', size);
    return this.http.get<Post[]>(`${this.apiUrl}/suggestion`, { params });
  }

  getPostByUser(
    name: string,
    type: PostEnum,
    hashtags: string[],
    index: number,
    number: number
  ): Observable<Post[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('type', type)
      .append('hashtags', hashtags.map((item) => item).join(','))
      .append('index', index)
      .append('number', number);
    return this.http.get<Post[]>(`${this.apiUrl}/reel`, { params });
  }

  getPostByGroupNameAndType(
    name: string,
    type: string | null,
    index: number,
    number: number
  ): Observable<Post[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('index', index)
      .append('number', number).append('type', type || '');
    return this.http.get<Post[]>(`${this.apiUrl}/get/group`, { params });
  }
}
