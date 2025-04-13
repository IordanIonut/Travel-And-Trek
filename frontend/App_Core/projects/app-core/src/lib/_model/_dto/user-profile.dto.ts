import { Highlight } from '../_class/highlight';
import { User } from '../_class/user';

export interface UserProfileDTO {
  user: User;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
  highlights: Highlight[];
}
