import { Group } from '../models/group';

export interface GroupDetailDTO {
  group: Group;
  postCount: number;
  membersCount: number;
  adminCount: number;
}
