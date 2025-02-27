import { Injectable } from '@angular/core';
import { GroupDetailDTO } from 'src/app/_type/dto/group.detail.dto';
import { UserProfileDTO } from 'src/app/_type/dto/user-profile.dto';
import { CommentEnum } from 'src/app/_type/enum/comment.enum';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { ShareEnum } from 'src/app/_type/enum/share.enum';
import { CommentId } from 'src/app/_type/models/commet';
import { Group } from 'src/app/_type/models/group';
import { Highlight } from 'src/app/_type/models/highlight';
import { Post, PostId } from 'src/app/_type/models/post';
import { Share, ShareId } from 'src/app/_type/models/share';
import { Story } from 'src/app/_type/models/story';
import { User } from 'src/app/_type/models/user';

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
    return (data as Story).expiration_time !== undefined;
  }
}
