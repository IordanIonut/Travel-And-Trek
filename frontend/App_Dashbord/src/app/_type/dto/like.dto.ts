import { LikeContentEnum } from '../enum/like.content.enum';

export interface LikeDTO {
  count: number;
  content: LikeContentEnum;
}
