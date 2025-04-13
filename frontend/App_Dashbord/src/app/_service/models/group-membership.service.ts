import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Environment,
  GroupMembership,
} from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class GroupMembershipService {
  private apiUrl = Environment.baseUrl + '/api/group/membership';
  constructor(private http: HttpClient) {}

  postCreateGroupMembership(
    groupMembership: GroupMembership
  ): Observable<GroupMembership> {
    return this.http.post<GroupMembership>(
      `${this.apiUrl}/save`,
      groupMembership
    );
  }
}
