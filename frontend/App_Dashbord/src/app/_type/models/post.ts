import { PostEnum } from '../enum/post.enum';
import { Hastag } from './hashtag';
import { Media } from './media';
import { User } from './user';

export interface Post {
  id: PostId;
  post_user_id: User;
  post_medias_id: Media[];
  post_hashtag_id: Hastag[];
  tagged_users: User[];
  description: string;
  visible: boolean;
  create_at: Date;
  update_at: Date;
}

export interface PostId {
  id: number;
  type: PostEnum;
}
