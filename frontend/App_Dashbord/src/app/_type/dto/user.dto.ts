import { FollowerStatusEnum } from '../enum/follower.status.enum';
import { User } from '../models/user';

export interface UserDTO {
  user: User;
  friends: User[];
  state: FollowerStatusEnum;

}
