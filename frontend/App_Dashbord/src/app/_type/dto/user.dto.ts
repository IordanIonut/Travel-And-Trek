import { Highlight } from '../models/highlight';
import { User } from '../models/user';

export interface UserDTO {
  user: User;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
  highlights: Highlight[];
}
