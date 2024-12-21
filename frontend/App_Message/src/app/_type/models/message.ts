import { Group } from './group';
import { Story } from './story';
import { User } from './user';

export interface Message {
  id: Id;
  sender_id: User;
  recipient_id: User;
  post_id: any;
  story_id: Story;
  group_id: Group;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface Id {
  id: string;
  type: string;
}
