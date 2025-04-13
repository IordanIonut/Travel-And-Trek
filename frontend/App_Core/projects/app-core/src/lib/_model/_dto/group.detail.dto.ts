import { Group } from '../_class/group';

export interface GroupDetailDTO {
  group: Group;
  postCount: number;
  membersCount: number;
  adminCount: number;
}
