import { Component, ViewEncapsulation } from '@angular/core';
import {
  Environment,
  FollowService,
  JwtService,
  MaterialModule,
  Post,
  PostEnum,
  PostService,
  SkeletonService,
  Story,
  StoryService,
  UserDTO,
  UserService,
} from 'travel-and-trek-app-core/dist/app-core';
import { StoryComponent } from '../../_components/story/story.component';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { PostComponent } from '../../_components/post/post.component';
import { UserComponent } from '../../_components/user/user.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    StoryComponent,
    MastheadComponent,
    HttpClientModule,
    NgFor,
    NgIf,
    PostComponent,
    UserComponent,
  ],
  providers: [
    UserService,
    StoryService,
    PostService,
    SkeletonService,
    FollowService,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  story!: Story[];
  selectedValues!: string[];
  index = [0];

  postsText: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  postsReel: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  posts: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  users: { index: number; data: UserDTO[] }[] = [{ index: 0, data: [] }];

  indexPosts: number = 0;
  indexPostsText: number = 0;
  indexPostsReel: number = 0;
  indexUsers: number = 0;

  isLoadingPost: boolean = false;
  isLoadingUser: boolean = false;
  isLoadingPostText: boolean = false;
  isLoadingPostReel: boolean = false;

  isLoading!: boolean;
  constructor(
    private _storyService: StoryService,
    private _postService: PostService,
    private _followerService: FollowService,
    protected _jwtService: JwtService,
    protected _skeletonService: SkeletonService
  ) {}

  ngOnInit(): void {
    this._storyService
      .findFriendsStory(this._jwtService.getUserInfo()?.name!, 0, 300)
      .subscribe({
        next: (data: Story[]) => {
          this.story = data;
        },
        error: (error: Error) => {
          console.log(error);
        },
      });

    this.onTabChangeFollowing({ index: this.generate() });
  }

  protected onScroll(event: any) {
    const element = event.target;
    const threshold = 100;
    const isNearBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold;
    const index: number = this.generate();
    if (
      isNearBottom &&
      !this.isLoadingPost &&
      !this.isLoadingUser &&
      !this.isLoadingPostReel &&
      !this.isLoadingPostText
    ) {
      if (index === 0) {
        this.indexPosts++;
        this.isLoadingPost = true;
      }
      if (index === 1) {
        this.indexUsers++;
        this.isLoadingUser = true;
      }
      if (index === 2) {
        this.indexPostsReel++;
        this.isLoadingPostReel = true;
      }
      if (index === 3) {
        this.indexPostsText++;
        this.isLoadingPostText = true;
      }
      this.index.push(
        Math.max(
          this.indexUsers,
          this.indexPosts,
          this.indexPostsReel,
          this.indexPostsText
        )
      );
      this.onTabChangeFollowing({ index });
    }
  }

  protected onTabChangeFollowing(event: any) {
    const selectedTabIndex = event.index;
    if (selectedTabIndex === 0) {
      this._postService
        .getPostByUserFriends(
          this._jwtService.getUserInfo()!.name!,
          PostEnum.POST,
          this._jwtService.getUserInfo()!.hashtag!,
          this.indexPosts,
          Environment.number
        )
        .subscribe({
          next: (data: Post[]) => {
            if (this.indexPosts === 0) {
              if (!this.posts[this.indexPosts]) {
                this.posts[this.indexPosts] = {
                  index: this.indexPosts,
                  data: [],
                };
              }
              this.posts[this.indexPosts].data = data;
            } else {
              this.posts.push({ index: this.indexPosts, data });
            }
            this.isLoadingPost = false;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    } else if (selectedTabIndex === 1) {
      this._followerService
        .findUserSuggestions(
          this._jwtService.getUserInfo()!.name!,
          this._jwtService.getUserInfo()!.hashtag!,
          this.indexUsers,
          Environment.number
        )
        .subscribe({
          next: (data: UserDTO[]) => {
            if (this.indexUsers === 0) {
              if (!this.users[this.indexUsers]) {
                this.users[this.indexUsers] = {
                  index: this.indexUsers,
                  data: [],
                };
              }
              this.users[this.indexUsers].data = data;
            } else {
              this.users.push({ index: this.indexUsers, data });
            }
            this.isLoadingUser = false;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    } else if (selectedTabIndex === 2) {
      this._postService
        .getPostByUserFriends(
          this._jwtService.getUserInfo()!.name!,
          PostEnum.REEL,
          this._jwtService.getUserInfo()!.hashtag!,
          this.indexPostsReel,
          Environment.number
        )
        .subscribe({
          next: (data: Post[]) => {
            if (this.indexPostsReel === 0) {
              if (!this.postsReel[this.indexPostsReel]) {
                this.postsReel[this.indexPostsReel] = {
                  index: this.indexPostsReel,
                  data: [],
                };
              }
              this.postsReel[this.indexPostsReel].data = data;
            } else {
              this.postsReel.push({ index: this.indexPostsReel, data });
            }
            this.isLoadingPostReel = false;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    } else if (selectedTabIndex === 3) {
      this._postService
        .getPostByUserFriends(
          this._jwtService.getUserInfo()!.name!,
          PostEnum.TEXT,
          this._jwtService.getUserInfo()!.hashtag!,
          this.indexPostsText,
          Environment.number
        )
        .subscribe({
          next: (data: Post[]) => {
            if (this.indexPostsText === 0) {
              if (!this.postsText[this.indexPostsText]) {
                this.postsText[this.indexPostsText] = {
                  index: this.indexPostsText,
                  data: [],
                };
              }
              this.postsText[this.indexPostsText].data = data;
            } else {
              this.postsText.push({ index: this.indexPostsText, data });
            }
            this.isLoadingPostText = false;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
  }

  private generate(): number {
    return Math.floor(Math.random() * 4);
  }

  protected generateIndexArray(index: number): number[] {
    return index !== 0 ? Array.from({ length: index }, (_, i) => i) : [0];
  }
}
