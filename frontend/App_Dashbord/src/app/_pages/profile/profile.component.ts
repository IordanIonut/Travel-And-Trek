import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { PostComponent } from '../../_components/post/post.component';
import { StoryComponent } from '../../_components/story/story.component';
import { PlaceComponent } from '../../_components/place/place.component';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { FilterSeach } from 'src/app/_type/filters/filter';
import { UserService } from 'src/app/_service/models/user.service';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { PostService } from 'src/app/_service/models/post.service';
import { Post } from 'src/app/_type/models/post';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { ShareService } from 'src/app/_service/models/share.service';
import { Share } from 'src/app/_type/models/share';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { UserProfileDTO } from 'src/app/_type/dto/user-profile.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/_service/models/group.service';
import { GroupDetailDTO } from 'src/app/_type/dto/group.detail.dto';
import { error } from 'console';
import { ValidationModelService } from 'src/app/_service/validator/validation-model.service';
import { User } from 'src/app/_type/models/user';
import { Hastag } from 'src/app/_type/models/hashtag';
import { Highlight } from 'src/app/_type/models/highlight';
import { FollowService } from 'src/app/_service/models/follower.service';
import { FollowerStatusEnum } from 'src/app/_type/enum/follower.status.enum';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import e from 'express';
import { UserComponent } from 'src/app/_components/user/user.component';
import { iconsObject } from 'src/app/_type/icon/icon';
import { SendComponent } from "../../_dialogs/send/send.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MaterialModule,
    NgFor,
    NgIf,
    MastheadComponent,
    PostComponent,
    StoryComponent,
    HttpClientModule,
    PostComponent,
    UserComponent,
    SendComponent
],
  providers: [
    UserService,
    PostService,
    ShareService,
    GroupService,
    FollowService,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  profileDTO?: UserProfileDTO | GroupDetailDTO;
  iconsObject = iconsObject;
  postsAll: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  postsReel: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  postsText: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  postMedia: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  shareAll: { index: number; data: Share[] }[] = [{ index: 0, data: [] }];
  postTag: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];

  followers: { index: number; data: UserDTO[] }[] = [{ index: 0, data: [] }];
  blocks: { index: number; data: UserDTO[] }[] = [{ index: 0, data: [] }];
  followings: { index: number; data: UserDTO[] }[] = [{ index: 0, data: [] }];
  indexFollower: number = 0;
  indexBlock: number = 0;
  indexFollowing: number = 0;
  isLoadingFollower: boolean = false;
  isLoadingBlock: boolean = false;
  isLoadingFollowing: boolean = false;

  indexAll: number = 0;
  indexReel: number = 0;
  indexShare: number = 0;
  indexTag: number = 0;
  indexText: number = 0;
  indexMedia: number = 0;

  isLoadingAll: boolean = false;
  isLoadingReel: boolean = false;
  isLoadingShare: boolean = false;
  isLoadingTag: boolean = false;
  isLoadingText: boolean = false;
  isLoadingMedia: boolean = false;

  elemnts: string[] = ['settings', 'qr_code', 'logout'];
  filters: FilterSeach[] = [
    {
      value: '1',
      icon: 'person',
      name: 'Fallowing',
    },
    {
      value: '1',
      icon: 'person',
      name: 'Fallowing',
    },
  ];

  isPhoto!: boolean;
  isFollowrs!: boolean;
  isFollowing!: boolean;

  @ViewChild('conProfileDialog', { static: false })
  con!: ElementRef<HTMLElement>;
  @ViewChild('imgProfileDialog', { static: false })
  img!: ElementRef<HTMLImageElement>;

  user!: string;
  type!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: DialogService,
    private userService: UserService,
    private postService: PostService,
    private shareService: ShareService,
    private groupService: GroupService,
    private shadow: ShadowService,
    protected validatorService: ValidationModelService,
    private cdr: ChangeDetectorRef,
    private followerService: FollowService
  ) {
    this.isPhoto = true;
    this.isFollowrs = false;
    this.isFollowing = false;

    this.route.queryParams.subscribe((params) => {
      this.user = params['name'];
      this.type = params['type'];
    });
  }

  ngAfterViewInit(): void {
    if (this.type === 'user') {
      this.userService.findUserByName(this.user).subscribe({
        next: (data: UserProfileDTO) => {
          this.profileDTO = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else if (this.type === 'group') {
      this.groupService.findGroupDetailsByName(this.user).subscribe({
        next: (data: GroupDetailDTO) => {
          this.profileDTO = data;
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }

    if (this.isPhoto) this.onTabChangePhoto({ index: 0 });
    else if (this.isFollowing) this.onTabChangeFollowing({ index: 0 });
    else if (this.followers) this.onTabChangeFollowers();

    if (this.con && this.img) {
      const image = this.img.nativeElement;
      const content = this.con.nativeElement;
      image.crossOrigin = 'anonymous';
      if (image.complete) {
        this.shadow?.applyShadowStory(image, content);
      } else {
        image.addEventListener('load', () => {
          this.shadow?.applyShadowStory(image, content);
        });
      }
    }
  }

  protected onOpenPhote() {
    this.dialog.openDialogPhote(
      this.validatorService.isUserProfileDTOOrGroupDetaiDTO(this.profileDTO!)
        ? (this.profileDTO?.user!.profile_picture as string)
        : (this.profileDTO!.group!.url as string)
    );
  }

  protected getProperty(
    property:
      | 'url'
      | 'name'
      | 'hashtag'
      | 'posts'
      | 'followers'
      | 'followings'
      | 'bio'
      | 'highlight'
  ): any | undefined {
    if (
      this.validatorService.isUserProfileDTOOrGroupDetaiDTO(this.profileDTO!)
    ) {
      switch (property) {
        case 'url': {
          return this.profileDTO.user?.profile_picture;
        }
        case 'name': {
          return this.profileDTO.user.name;
        }
        case 'hashtag': {
          return (this.profileDTO.user?.user_hashtag_id as Hastag[]) || [];
        }
        case 'posts': {
          return this.profileDTO.postsCount;
        }
        case 'followers': {
          return this.profileDTO.followersCount;
        }
        case 'followings': {
          return this.profileDTO.followingsCount;
        }
        case 'bio': {
          return this.profileDTO.user.bio;
        }
        case 'highlight': {
          return (this.profileDTO?.highlights as Highlight[]) || [];
        }
      }
    } else if (
      this.validatorService.isGroupDetailDTOORUserProfileDTO(this.profileDTO!)
    ) {
      switch (property) {
        case 'url': {
          return this.profileDTO.group?.url;
        }
        case 'name': {
          return this.profileDTO?.group.name;
        }
        case 'hashtag': {
          return [];
        }
        case 'posts': {
          return this.profileDTO.postCount;
        }
        case 'followers': {
          return this.profileDTO.adminCount;
        }
        case 'followings': {
          return this.profileDTO.membersCount;
        }
        case 'bio': {
          return this.profileDTO.group.description;
        }
        case 'highlight': {
          return [];
        }
      }
    }
    return undefined;
  }

  protected onIsPhoto() {
    this.isPhoto = true;
    this.isFollowrs = false;
    this.isFollowing = false;

    if (this.postsAll?.[0]?.data?.length === 0)
      this.onTabChangePhoto({ index: 0 });
  }

  protected onIsFollowrs() {
    this.isPhoto = false;
    this.isFollowrs = true;
    this.isFollowing = false;

    if (this.followers?.[0]?.data?.length === 0) this.onTabChangeFollowers();
  }

  protected onIsFollowing() {
    this.isPhoto = false;
    this.isFollowrs = false;
    this.isFollowing = true;

    if (this.followings?.[0]?.data?.length === 0)
      this.onTabChangeFollowing({ index: 0 });
  }

  protected onScrollPhoto(event: any, index: number) {
    const element = event.target;
    const threshold = 100;
    const isNearBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold;
    if (
      isNearBottom &&
      !this.isLoadingAll &&
      !this.isLoadingReel &&
      !this.isLoadingShare &&
      !this.isLoadingTag &&
      !this.isLoadingText &&
      !this.isLoadingMedia
    ) {
      if (index === 0) {
        this.indexAll++;
        this.isLoadingAll = true;
      }
      if (index === 1) {
        this.indexMedia++;
        this.isLoadingMedia = true;
      }
      if (index === 2) {
        this.indexReel++;
        this.isLoadingReel = true;
      }
      if (index === 3) {
        this.indexText++;
        this.isLoadingText = true;
      }
      if (index === 4) {
        this.indexShare++;
        this.isLoadingShare = true;
      }
      if (index === 5) {
        this.indexTag++;
        this.isLoadingTag = true;
      }
      this.onTabChangePhoto({ index });
    }
  }

  protected onScrollFollowing(event: any, index: number) {
    const element = event.target;
    const threshold = 100;
    const isNearBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold;

    if (isNearBottom && !this.isLoadingFollowing && !this.isLoadingBlock) {
      if (index === 0) {
        this.indexFollowing++;
        this.isLoadingFollowing = true;
      }
      if (index === 1) {
        this.indexBlock++;
        this.isLoadingBlock = true;
      }
      this.onTabChangeFollowing({ index });
    }
  }

  protected onScrollFollowers(event: any) {
    const element = event.target;
    const threshold = 100;
    const isNearBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold;

    if (isNearBottom && !this.isLoadingFollower) {
      this.indexFollowing++;
      this.isLoadingFollowing = true;
      this.onTabChangeFollowers();
    }
  }

  protected onTabChangePhoto(event: any) {
    const selectedTabIndex = event.index;
    if (this.type === 'user') {
      switch (selectedTabIndex) {
        case 0: {
          this.postService
            .getPostByProfile(this.user, this.indexAll, environment.number)
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexAll === 0) {
                  if (!this.postsAll[this.indexAll]) {
                    this.postsAll[this.indexAll] = {
                      index: this.indexAll,
                      data: [],
                    };
                  }
                  this.postsAll[this.indexAll].data = data;
                } else {
                  this.postsAll.push({ index: this.indexAll, data });
                }
                this.isLoadingAll = false;
              },
              error: (error) => {
                console.error(error);
              },
            });
          break;
        }
        case 1: {
          this.postService
            .getPostByProfileType(
              this.user,
              PostEnum.POST,
              this.indexMedia,
              environment.number
            )
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexMedia === 0) {
                  if (!this.postMedia[this.indexMedia]) {
                    this.postMedia[this.indexMedia] = {
                      index: this.indexMedia,
                      data: [],
                    };
                  }
                  this.postMedia[this.indexMedia].data = data;
                } else {
                  this.postMedia.push({ index: this.indexMedia, data });
                }
                this.isLoadingAll = false;
              },
              error: (error) => {
                console.error(error);
              },
            });

          break;
        }
        case 2: {
          this.postService
            .getPostByProfileType(
              this.user,
              PostEnum.REEL,
              this.indexReel,
              environment.number
            )
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexReel === 0) {
                  if (!this.postsReel[this.indexReel]) {
                    this.postsReel[this.indexReel] = {
                      index: this.indexReel,
                      data: [],
                    };
                  }
                  this.postsReel[this.indexReel].data = data;
                } else {
                  this.postsReel.push({ index: this.indexReel, data });
                }
                this.isLoadingReel = false;
              },
              error: (error) => {
                console.error(error);
              },
            });
          break;
        }
        case 3: {
          this.postService
            .getPostByProfileType(
              this.user,
              PostEnum.TEXT,
              this.indexText,
              environment.number
            )
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexText === 0) {
                  if (!this.postsText[this.indexText]) {
                    this.postsText[this.indexText] = {
                      index: this.indexText,
                      data: [],
                    };
                  }
                  this.postsText[this.indexText].data = data;
                } else {
                  this.postsText.push({ index: this.indexText, data });
                }
                this.isLoadingText = false;
              },
              error: (error) => {
                console.error(error);
              },
            });
          break;
        }
        case 4: {
          this.shareService
            .getPostByProfile(this.user, this.indexShare, environment.number)
            .subscribe({
              next: (data: Share[]) => {
                if (this.indexShare === 0) {
                  if (!this.shareAll[this.indexShare]) {
                    this.shareAll[this.indexShare] = {
                      index: this.indexShare,
                      data: [],
                    };
                  }
                  this.shareAll[this.indexShare].data = data;
                } else {
                  this.shareAll.push({ index: this.indexShare, data });
                }
                this.isLoadingShare = false;
              },
              error: (error) => {
                console.log(error);
              },
            });
          break;
        }
        case 5: {
          this.postService
            .getPostByUserTag(this.user, this.indexTag, environment.number)
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexTag === 0) {
                  if (!this.postTag[this.indexTag]) {
                    this.postTag[this.indexTag] = {
                      index: this.indexTag,
                      data: [],
                    };
                  }
                  this.postTag[this.indexTag].data = data;
                } else {
                  this.postTag.push({ index: this.indexTag, data });
                }
                this.isLoadingTag = false;
              },
              error: (error) => {
                console.log(error);
              },
            });
        }
      }
    } else if (this.type === 'group') {
      switch (selectedTabIndex) {
        case 0: {
          this.postService
            .getPostByGroupNameAndType(
              this.user,
              null,
              this.indexAll,
              environment.number
            )
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexAll === 0) {
                  if (!this.postsAll[this.indexAll]) {
                    this.postsAll[this.indexAll] = {
                      index: this.indexAll,
                      data: [],
                    };
                  }
                  this.postsAll[this.indexAll].data = data;
                } else {
                  this.postsAll.push({ index: this.indexAll, data });
                }
                this.isLoadingAll = false;
              },
              error: (error: Error) => {
                console.log(error);
              },
            });
          break;
        }
        case 1: {
          this.postService
            .getPostByGroupNameAndType(
              this.user,
              PostEnum.POST,
              this.indexMedia,
              environment.number
            )
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexMedia === 0) {
                  if (!this.postMedia[this.indexMedia]) {
                    this.postMedia[this.indexMedia] = {
                      index: this.indexMedia,
                      data: [],
                    };
                  }
                  this.postMedia[this.indexMedia].data = data;
                } else {
                  this.postMedia.push({ index: this.indexMedia, data });
                }
                this.isLoadingMedia = false;
              },
              error: (error: Error) => {
                console.log(error);
              },
            });
          break;
        }
        case 2: {
          this.postService
            .getPostByGroupNameAndType(
              this.user,
              PostEnum.REEL,
              this.indexReel,
              environment.number
            )
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexReel === 0) {
                  if (!this.postsReel[this.indexReel]) {
                    this.postsReel[this.indexReel] = {
                      index: this.indexReel,
                      data: [],
                    };
                  }
                  this.postsReel[this.indexReel].data = data;
                } else {
                  this.postsReel.push({ index: this.indexReel, data });
                }
                this.isLoadingReel = false;
              },
              error: (error: Error) => {
                console.log(error);
              },
            });
          break;
        }
        case 3: {
          this.postService
            .getPostByGroupNameAndType(
              this.user,
              PostEnum.TEXT,
              this.indexText,
              environment.number
            )
            .subscribe({
              next: (data: Post[]) => {
                if (this.indexText === 0) {
                  if (!this.postsText[this.indexText]) {
                    this.postsText[this.indexText] = {
                      index: this.indexText,
                      data: [],
                    };
                  }
                  this.postsText[this.indexText].data = data;
                } else {
                  this.postsText.push({ index: this.indexText, data });
                }
                this.isLoadingText = false;
              },
              error: (error: Error) => {
                console.log(error);
              },
            });
          break;
        }
        case 4: {
          this.shareService
            .getAllSharesByGroup(this.user, this.indexShare, environment.number)
            .subscribe({
              next: (data: Share[]) => {
                if (this.indexShare === 0) {
                  if (!this.shareAll[this.indexShare]) {
                    this.shareAll[this.indexShare] = {
                      index: this.indexShare,
                      data: [],
                    };
                  }
                  this.shareAll[this.indexShare].data = data;
                } else {
                  this.shareAll.push({ index: this.indexShare, data });
                }
                this.isLoadingShare = false;
              },
              error: (error: Error) => {
                console.log(error);
              },
            });
          break;
        }
        case 5: {
          ///////need to add tags on group
          // this.postService
          //   .getPostByUserTag(this.user, this.indexTag, environment.number)
          //   .subscribe({
          //     next: (data: Post[]) => {
          //       // console.log(data);
          //       this.postTag = data;
          //     },
          //     error: (error) => {
          //       console.log(error);
          //     },
          //   });
          break;
        }
      }
    }
  }

  protected onTabChangeFollowing(event: any) {
    const selectedTabIndex = event.index;
    if (this.type === 'user') {
      switch (selectedTabIndex) {
        case 0: {
          this.followerService
            .findUsersFollowerByStatus(
              this.user,
              FollowerStatusEnum.ACCEPTED,
              this.indexFollowing,
              environment.number
            )
            .subscribe({
              next: (data: UserDTO[]) => {
                if (this.indexFollowing === 0) {
                  if (!this.followings[this.indexFollowing]) {
                    this.followings[this.indexFollowing] = {
                      index: this.indexFollowing,
                      data: [],
                    };
                  }
                  this.followings[this.indexFollowing].data = data;
                } else {
                  this.followings.push({ index: this.indexFollowing, data });
                }
                this.isLoadingFollowing = false;
              },
              error: (error: Error) => {
                console.log(error);
              },
            });
          break;
        }
        case 1: {
          this.followerService
            .findUsersFollowerByStatus(
              this.user,
              FollowerStatusEnum.BLOCK,
              this.indexFollowing,
              environment.number
            )
            .subscribe({
              next: (data: UserDTO[]) => {
                if (this.indexBlock === 0) {
                  if (!this.blocks[this.indexBlock]) {
                    this.blocks[this.indexBlock] = {
                      index: this.indexBlock,
                      data: [],
                    };
                  }
                  this.blocks[this.indexBlock].data = data;
                } else {
                  this.blocks.push({ index: this.indexBlock, data });
                }
                this.isLoadingBlock = false;
              },
              error: (error: Error) => {
                console.log(error);
              },
            });
          break;
        }
      }
    } else if (this.type === 'group') {
    }
  }

  protected onTabChangeFollowers() {
    this.followerService
      .findUsersByFollowerStatus(this.user, FollowerStatusEnum.ACCEPTED, 0, 10)
      .subscribe({
        next: (data: UserDTO[]) => {
          if (this.indexFollower === 0) {
            if (!this.followers[this.indexFollower]) {
              this.followers[this.indexFollower] = {
                index: this.indexFollower,
                data: [],
              };
            }
            this.followers[this.indexFollower].data = data;
          } else {
            this.followers.push({ index: this.indexFollower, data });
          }
          this.isLoadingFollower = false;
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
  }

  protected generateIndexArray(index: number): number[] {
    return index !== 0 ? Array.from({ length: index }, (_, i) => i) : [0];
  }
}
