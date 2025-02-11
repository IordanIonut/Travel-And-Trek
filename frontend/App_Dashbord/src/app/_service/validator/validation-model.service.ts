import { Injectable } from '@angular/core';
import { GroupDetailDTO } from 'src/app/_type/dto/group.detail.dto';
import { UserProfileDTO } from 'src/app/_type/dto/user-profile.dto';
import { Group } from 'src/app/_type/models/group';
import { Highlight } from 'src/app/_type/models/highlight';
import { Post } from 'src/app/_type/models/post';
import { Share } from 'src/app/_type/models/share';
import { User } from 'src/app/_type/models/user';

@Injectable({
  providedIn: 'root'
})
export class ValidationModelService {

  constructor() { }

  isUserProfileDTOOrGroupDetaiDTO(data: UserProfileDTO | GroupDetailDTO | undefined): data is UserProfileDTO {
    return (data as UserProfileDTO)?.user !== undefined;
  }

  isGroupDetailDTOORUserProfileDTO(
    data: UserProfileDTO | GroupDetailDTO | undefined
  ): data is GroupDetailDTO {
    return (data as GroupDetailDTO)?.group !== undefined;
  }

  isPostOrShare(data: Post | Share | undefined): data is Post{
    return (data as Post)?.post_group_id !== undefined;
  }

  isShareOrPost(data:  Post | Share | undefined): data is Share {
    return (data as Share)?.share_post_id !== undefined;
  }

  isGroupOrUser(data: Group | User | undefined):data is Group{
    return (data as Group)?.name !== undefined;
  }

  isUserOrGroup(data: Group | User | undefined):data is User{
    return (data as User)?.name !== undefined;
  }
}
