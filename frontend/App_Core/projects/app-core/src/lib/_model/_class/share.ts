import { User } from './user';
import { Media } from './media';
import { Post } from './post';
import { Story } from './story';
import { ShareEnum } from '../_enum/share.enum';

export interface Share {
  shareId: ShareId;
  share_user_id: User;
  share_user_id_sharled: User;
  share_media_id: Media;
  share_post_id: Post;
  share_story_id: Story;
  description: string;
  create_at: Date;
  update_at: Date;
}

export interface ShareId {
  id: string;
  type: ShareEnum;
}
