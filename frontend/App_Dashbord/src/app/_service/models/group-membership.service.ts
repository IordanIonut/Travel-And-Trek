import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDTO } from 'src/app/_type/dto/group.dto';
import { SearchDTO } from 'src/app/_type/dto/search.dto';
import { GroupMembershipEnum } from 'src/app/_type/enum/group-membership.enum';
import { Follow } from 'src/app/_type/models/follow';
import { GroupMembership } from 'src/app/_type/models/group-membership';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupMembershipService {
  private apiUrl = environment.baseUrl + '/group/membership';
  constructor(private http: HttpClient) {}

  postCreateGroupMembership(
    groupMembership: GroupMembership
  ): Observable<GroupMembership> {
    return this.http.post<GroupMembership>(`${this.apiUrl}/save`, 
      groupMembership
    );
  }
}
