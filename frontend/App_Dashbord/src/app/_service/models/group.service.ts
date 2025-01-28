import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDetailDTO } from 'src/app/_type/dto/group.detail.dto';
import { GroupDTO } from 'src/app/_type/dto/group.dto';
import { SearchDTO } from 'src/app/_type/dto/search.dto';
import { Group } from 'src/app/_type/models/group';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private apiUrl = environment.baseUrl + '/group';
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
