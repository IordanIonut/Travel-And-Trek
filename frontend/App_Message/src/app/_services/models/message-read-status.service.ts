import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/_type/models/message';
import { MessageReadStatus } from 'src/app/_type/models/message-read-status';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageReadStatusService {
  private apiUrl = environment.baseUrl + '/message/read/status';
  constructor(private http: HttpClient) {}

  findConversationsByUser(name: string, conversationType: string): Observable<MessageReadStatus[]> {
    return this.http.get<MessageReadStatus[]>(
      `${this.apiUrl}/contact?name=${name}&conversationType=${conversationType}`
    );
  }

  findMessageByUser(
    recipient: string,
    sender: string
  ): Observable<MessageReadStatus[]> {
    return this.http.get<MessageReadStatus[]>(
      `${this.apiUrl}/chat/person?recipient=${recipient}&sender=${sender}`
    );
  }

  findMessageReadStatusByGroup(
    groupId: string
  ): Observable<MessageReadStatus[]> {
    return this.http.get<MessageReadStatus[]>(
      `${this.apiUrl}/chat/group?groupId=${groupId}`
    );
  }
}
