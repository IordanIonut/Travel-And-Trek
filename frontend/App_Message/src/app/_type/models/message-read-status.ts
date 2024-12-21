import { Message } from './message';
import { User } from './user';

export interface MessageReadStatus {
  id: string;
  message_id: Message;
  user_id: User;
  is_read: boolean;
  read_at: string;
}
