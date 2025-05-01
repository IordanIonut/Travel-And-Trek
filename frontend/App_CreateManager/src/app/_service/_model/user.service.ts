import { Injectable } from '@angular/core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';
import { MatDialog } from '@angular/material/dialog';
import { TranslateDialogComponent } from 'src/app/_components/_dialog/translate-dialog/translate-dialog.component';
import { Observable } from 'rxjs';
import { NsfwDialogComponent } from 'src/app/_components/_dialog/nsfw-dialog/nsfw-dialog.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Environment, SearchDTO } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = Environment.baseUrl + '/api/user';

  constructor(private http: HttpClient) {}

  findSuggestersSearch(
    name: string,
    type: string,
    page: number,
    size: number
  ): Observable<SearchDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('type', type)
      .append('page', page)
      .append('size', size);
    return this.http.get<SearchDTO[]>(`${this.apiUrl}/suggesters`, { params });
  }
}
