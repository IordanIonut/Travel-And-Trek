import { Injectable } from '@angular/core';
import { MessageReadStatus } from 'src/app/_type/models/message-read-status';
import { User } from 'src/app/_type/models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidationModelService {

  constructor() { }

  isUser(data: User | MessageReadStatus): data is User {
    return (data as User)?.user_hashtag_id !== undefined;
  }

  isMessageReadStatus(
    data: User | MessageReadStatus
  ): data is MessageReadStatus {
    return (data as MessageReadStatus)?.message_id !== undefined;
  }
}
