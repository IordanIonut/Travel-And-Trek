import { Group } from '../_class/group';
import { GroupMembership } from '../_class/group-membership';
import { User } from '../_class/user';

export interface GroupDTO {
  group: Group;
  groupMembership: GroupMembership[];
  friends: User[];
  followers: User[];
  users: number;
}
