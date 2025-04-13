import { LikeContentEnum } from '../_enum/like.content.enum';

export interface LikeDTO {
  count: number;
  content: LikeContentEnum;
}
