import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = environment.baseUrl + '/comment';

  constructor(private http: HttpClient) {}

  findCountCommentsByPost(id: string, type: PostEnum): Observable<number> {
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http.get<number>(`${this.apiUrl}/post/number`, { params });
  }
}
