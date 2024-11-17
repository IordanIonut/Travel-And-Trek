import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/_type/models/post';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = environment.baseUrl + '/post';

  constructor(private http: HttpClient) {}

  getPostByProfile(
    name: string,
    type: string,
    index: number,
    number: number
  ): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.apiUrl}/find?name=${name}&type=${type}&index=${index}&number=${number}`
    );
  }
}
