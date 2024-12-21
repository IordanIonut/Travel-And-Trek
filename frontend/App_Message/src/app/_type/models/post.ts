import { User } from './user';

export interface Post {
  id: PostId;
  post_user_id: User;
  post_medias_id: any[];
  post_hashtag_id: any[];
  tagged_users: User[];
  description: string;
  visible: boolean;
  create_at: Date;
  update_at: Date;
}

export interface PostId {
  id: string;
  type: any;
}
