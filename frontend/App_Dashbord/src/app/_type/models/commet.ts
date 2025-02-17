import { CommentEnum } from '../enum/comment.enum';
import { Media } from './media';
import { Post } from './post';
import { User } from './user';

export interface Comment {
  id: CommentId;
  comment_user_id?: User | null;
  comment_post_id?: Post | null;
  comment_media_id?: Media | null;
  comment_journal_id?: any | null;
  message?: string | null;
  create_at?: Date | null;
  comment_source_id?: Comment | null;
}
export interface CommentId {
  id: string;
  type: CommentEnum;
}
