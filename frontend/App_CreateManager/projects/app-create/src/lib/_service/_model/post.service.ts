import { Injectable } from '@angular/core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {
  Environment,
  Post,
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
