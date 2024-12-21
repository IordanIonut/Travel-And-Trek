import { User } from './user';

export interface Story {
  id: string;
  story_user_id: User;
  story_media_id: any;
  create_at: Date;
  expiration_time: string;
  expiration: boolean;
}
