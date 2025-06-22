import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Environment } from '../../_environment/environment.local';
import { setLoadingOnRequest, SkeletonService } from '../_skeleton/skeleton.service';
import { GroupMembership } from '../../_model/public-api';

@Injectable({
  providedIn: 'root',
})
export class GroupMembershipService {
  private apiUrl = Environment.baseUrl + '/api/group/membership';
  constructor(
    private http: HttpClient,
    private skeletonService: SkeletonService
  ) {}

  postCreateGroupMembership(
    groupMembership: GroupMembership
  ): Observable<GroupMembership | null> {
    return this.http
      .post<GroupMembership>(`${this.apiUrl}/save`, groupMembership)
      .pipe(
        switchMap((data) => {
          if (!data) {
            return of(data);
          }
          return of(data).pipe(setLoadingOnRequest(this.skeletonService));
        })
      );
  }
}
