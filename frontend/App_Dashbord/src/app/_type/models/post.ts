import { PostEnum } from '../enum/post.enum';
import { Group } from './group';
import { Hastag } from './hashtag';
import { Media } from './media';
import { User } from './user';

export interface Post {
  id: PostId;
  post_user_id: User;
  post_medias_id: Media[];
  post_hashtag_id: Hastag[];
  post_group_id: Group;
  tagged_users: User[];
  description: string;
  visible: boolean;
  create_at: Date;
  update_at: Date;
}

export interface PostId {
  id: string;
  type: PostEnum;
}
