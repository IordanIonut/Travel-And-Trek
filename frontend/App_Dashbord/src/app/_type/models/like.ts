import { LikeContentEnum } from '../enum/like.content.enum';
import { LikeEnum } from '../enum/like.enum';
import { Comment } from './commet';
import { Media } from './media';
import { Post } from './post';
import { User } from './user';

export interface Like {
  id: LikeId;
  like_user_id: User;
  like_media_id?: Media | null;
  like_post_id?: Post | null;
  like_comment_id?: Comment | null;
  create_at: Date;
}

export interface LikeId {
  id: string;
  type: LikeEnum;
  content: LikeContentEnum;
}
