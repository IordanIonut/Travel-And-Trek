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
import { PersonComponent } from '../../_components/person/person.component';
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
    PersonComponent,
    PostComponent,
  ],
  providers: [UserService, PostService, ShareService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  userDTO?: UserProfileDTO;

  postsAll!: Post[];
  postsReel!: Post[];
  postsText!: Post[];
  postMedia!: Post[];
  shareAll!: Share[];
  postTag!: Post[];

  indexPost = 0;
  indexReel = 0;
  indexShare = 0;
  indexTag = 0;

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

  items = Array(10);
  @ViewChild('con', { static: false })
  con!: ElementRef<HTMLElement>;
  @ViewChild('img', { static: false })
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
    private shadow: ShadowService,
    private cdr: ChangeDetectorRef
  ) {
    this.isPhoto = true;
    this.route.queryParams.subscribe((params) => {
      this.user = params['name'];
      this.type = params['type'];
    });
  }

  ngAfterViewInit(): void {

    this.userService.findUserByName(this.user).subscribe({
      next: (data) => {
        this.userDTO = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.postService
      .getPostByProfile(this.user, this.indexPost, environment.number)
      .subscribe({
        next: (data: Post[]) => {
          // console.log(data);
          this.postsAll = data;
        },
        error: (error) => {
          console.error(error);
        },
      });

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

  onOpenPhote() {
    this.dialog.openDialogPhote(this.userDTO?.user?.profile_picture as string);
  }

  onIsPhoto() {
    this.isPhoto = true;
    this.isFollowrs = false;
    this.isFollowing = false;
  }

  onIsFollowrs() {
    this.isPhoto = false;
    this.isFollowrs = true;
    this.isFollowing = false;
  }

  onIsFollowing() {
    this.isPhoto = false;
    this.isFollowrs = false;
    this.isFollowing = true;
  }

  onTabChange(event: any) {
    console.log(event);
    const selectedTabIndex = event.index;
    switch (selectedTabIndex) {
      case 0: {
        this.postService
          .getPostByProfile(this.user, this.indexPost, environment.number)
          .subscribe({
            next: (data: Post[]) => {
              this.postsAll = data;
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
            this.indexPost,
            environment.number
          )
          .subscribe({
            next: (data: Post[]) => {
              this.postMedia = data;
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
            this.indexPost,
            environment.number
          )
          .subscribe({
            next: (data: Post[]) => {
              this.postsReel = data;
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
            this.indexPost,
            environment.number
          )
          .subscribe({
            next: (data: Post[]) => {
              this.postsText = data;
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
              // console.log(data);
              this.shareAll = data;
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
              // console.log(data);
              this.postTag = data;
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    }
  }

  // playVideo(videoElement: HTMLVideoElement): void {
  //   videoElement.play();
  // }

  // pauseVideo(videoElement: HTMLVideoElement): void {
  //   videoElement.pause();
  // }
}
