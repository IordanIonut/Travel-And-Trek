import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Environment,
  GroupDetailDTO,
  GroupDTO,
} from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = Environment.baseUrl + '/api/group';
  constructor(private http: HttpClient) {}

  findGroupsByName(
    name: string,
    search: string,
    page: number,
    size: number
  ): Observable<GroupDTO[]> {
    const params = new HttpParams()
      .append('name', name)
      .append('search', search)
      .append('page', page)
      .append('size', size);
    return this.http.get<GroupDTO[]>(`${this.apiUrl}/suggesters/group`, {
      params,
    });
  }

  findGroupDetailsByName(name: string): Observable<GroupDetailDTO> {
    return this.http.get<GroupDetailDTO>(
      `${this.apiUrl}/get/details?name=${name}`
    );
  }
}
