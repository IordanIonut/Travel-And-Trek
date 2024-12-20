import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostEnum } from 'src/app/_type/enum/post.enum';
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
}
