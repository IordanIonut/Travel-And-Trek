import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FollowerStatusEnum } from 'src/app/_type/models/enum/follower.status.enum';
import { Message } from 'src/app/_type/models/message';
import { MessageReadStatus } from 'src/app/_type/models/message-read-status';
import { User } from 'src/app/_type/models/user';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowerService {
  private apiUrl = environment.baseUrl + '/follower';
  constructor(private http: HttpClient) {}

  findUsersByStatus(
    name: string,
    status: FollowerStatusEnum
  ): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/find?name=${name}&status=${status}`
    );
  }
}
