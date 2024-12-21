import { User } from "../user";

export interface UserDTO {
  user: User;
  postsCount: number;
  followersCount: number;
  followingsCount: number;
  highlights:any[];
}
