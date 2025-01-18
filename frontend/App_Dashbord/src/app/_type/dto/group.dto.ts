import { Group } from '../models/group';
import { GroupMembership } from '../models/group-membership';
import { User } from '../models/user';

export interface GroupDTO {
  group: Group;
  groupMembership: GroupMembership;
  friends: User[];
  followers: User[];
  users: number;
}
