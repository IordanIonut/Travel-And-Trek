import { FollowerStatusEnum } from '../enum/follower.status.enum';
import { User } from './user';

export interface Follow {
  id: Id;
  follower_user_id: User;
  follower_user_id_follower: User;
  created_at: Date;
}

export interface Id {
  id: string;
  status: FollowerStatusEnum;
}
