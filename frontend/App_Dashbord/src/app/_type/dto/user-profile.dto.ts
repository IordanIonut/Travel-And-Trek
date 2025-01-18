import { Highlight } from '../models/highlight';
import { User } from '../models/user';

export interface UserProfileDTO {
  user: User;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
  highlights: Highlight[];
}
