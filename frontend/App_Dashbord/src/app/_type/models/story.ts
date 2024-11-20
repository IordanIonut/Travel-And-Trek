import { Media } from './media';
import { User } from './user';

export interface Story {
  id: number;
  storyUserId: User;
  storyMediaId: Media;
  createAt: Date;
  expirationTime: string;
  expiration: boolean;
}
