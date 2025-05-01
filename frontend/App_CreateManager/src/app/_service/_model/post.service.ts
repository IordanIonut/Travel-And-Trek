import { Injectable } from '@angular/core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';
import { MatDialog } from '@angular/material/dialog';
import { TranslateDialogComponent } from 'src/app/_components/_dialog/translate-dialog/translate-dialog.component';
import { Observable } from 'rxjs';
import { NsfwDialogComponent } from 'src/app/_components/_dialog/nsfw-dialog/nsfw-dialog.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Environment,
  Post,
  SearchDTO,
} from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = Environment.baseUrl + '/api/post';

  constructor(private http: HttpClient) {}

  createPost(post: Post) {
    return this.http.post(`${this.apiUrl}/create`, post);
  }
}
