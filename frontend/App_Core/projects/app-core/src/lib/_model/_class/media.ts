import { Group, MediaEnum, Story, User } from '../public-api';

export interface Media {
  id: MediaId;
  media_user_id: User | null;
  media_group_id: Group | null;
  url: string;
  latitude: number;
  longitude: number;
  create_at: Date;
  story?: Story;
}
interface MediaId {
  id: string;
  type: MediaEnum;
}
