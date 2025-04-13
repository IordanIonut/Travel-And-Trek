import { FollowerStatusEnum } from '../_enum/follower.status.enum';
import { User } from '../_class/user';

export interface UserDTO {
  user: User;
  friends: User[];
  state: FollowerStatusEnum;
}
