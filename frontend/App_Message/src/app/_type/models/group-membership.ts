import { Group } from './group';
import { User } from './user';

export interface GroupMembership {
  id: Id;
  group_id: Group;
  user_id: User;
  joined_at: string;
}

export interface Id {
  id: string;
  role: string;
}
