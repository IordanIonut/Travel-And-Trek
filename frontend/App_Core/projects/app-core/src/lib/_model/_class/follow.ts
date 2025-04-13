import { FollowerStatusEnum } from '../_enum/follower.status.enum';
import { User } from './user';

export interface Follow {
  id: FollowId;
  follower_user_id: User;
  follower_user_id_follower: User;
  created_at: Date;
}

export interface FollowId {
  id: string;
  status: FollowerStatusEnum;
}
