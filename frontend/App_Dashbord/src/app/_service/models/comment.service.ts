import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentEnum } from 'src/app/_type/enum/comment.enum';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { Comment, CommentId } from 'src/app/_type/models/commet';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private apiUrl = environment.baseUrl + '/comment';

  constructor(private http: HttpClient) {}

  findCountCommentsByPost(
    id: string,
    type: PostEnum | CommentEnum
  ): Observable<number> {
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http.get<number>(`${this.apiUrl}/post/number`, { params });
  }

  findCommentsByPost(
    id: string,
    type: PostEnum | CommentEnum
  ): Observable<Comment[]> {
    const params = new HttpParams().append('id', id).append('type', type);
    return this.http.get<Comment[]>(`${this.apiUrl}/post`, { params });
  }

  postComment(comment: Comment): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/save`, comment);
  }

  findCommentById(id: CommentId): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}/find/id?id=${id}`);
  }
}
