import { Media } from './media';
import { User } from './user';

export interface Story {
  id: string;
  story_user_id: User;
  story_medias: Media[];
  create_at: Date;
  expiration_time: string;
  expiration: boolean;
}
