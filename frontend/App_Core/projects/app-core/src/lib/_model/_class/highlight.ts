import { Media } from './media';

export interface Highlight {
  id: string;
  highlight_medias: Media[];
  name: string;
  image: string;
  visibility: boolean;
  created_at: Date;
  updated_at: Date;
}
