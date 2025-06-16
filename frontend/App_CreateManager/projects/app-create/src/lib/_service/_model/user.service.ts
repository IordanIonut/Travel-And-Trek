import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
