import { GroupMembershipEnum } from '../_enum/group-membership.enum';
import { Group } from './group';
import { User } from './user';

export interface GroupMembership {
  id: GroupMembershipId;
  group_id: Group;
  user_id: User;
  joined_at: Date;
}

export interface GroupMembershipId {
  id: string;
  role: GroupMembershipEnum;
}
