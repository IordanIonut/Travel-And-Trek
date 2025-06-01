import { Injectable } from '@angular/core';
import {
  CommentEnum,
  CommentId,
  Group,
  GroupDetailDTO,
  Highlight,
  Post,
  PostEnum,
  PostId,
  Share,
  ShareEnum,
  ShareId,
  Story,
  User,
  UserProfileDTO,
} from '../../_model/public-api';

@Injectable({
  providedIn: 'root',
})
export class ValidationModelService {
  constructor() {}

  isUserProfileDTO(
    data: UserProfileDTO | GroupDetailDTO | undefined
  ): data is UserProfileDTO {
    return (data as UserProfileDTO)?.user !== undefined;
  }

  isGroupDetailDTO(
    data: UserProfileDTO | GroupDetailDTO | undefined
  ): data is GroupDetailDTO {
    return (data as GroupDetailDTO)?.group !== undefined;
  }

  isPost(data: Post | Share | undefined): data is Post {
    return (data as Post)?.post_group_id !== undefined;
  }

  isShare(data: Post | Share | undefined): data is Share {
    return (data as Share)?.share_post_id !== undefined;
  }

  isGroup(data: Group | User | undefined): data is Group {
    return (data as Group)?.name !== undefined;
  }

  isUser(data: Group | User | undefined): data is User {
    return (data as User)?.name !== undefined;
  }

  isCommentId(data: PostId | CommentId | undefined): data is CommentId {
    return data !== undefined && (data.type as CommentEnum) in CommentEnum;
  }

  isShareId(data: ShareId | PostId | undefined): data is ShareId {
    return data !== undefined && (data.type as ShareEnum) in ShareEnum;
  }

  isPostId(data: PostId | ShareId | CommentId | undefined): data is PostId {
    return data !== undefined && (data.type as PostEnum) in PostEnum;
  }

  isHighlight(data: Highlight | Story | undefined): data is Highlight {
    return (data as Highlight).highlight_medias !== undefined;
  }

  isStory(data: Story | Highlight | undefined): data is Story {
    return (data as Story).story_medias !== undefined;
  }
}
