import {
  CommonModule,
  isPlatformBrowser,
  NgFor,
  NgIf,
  NgStyle,
} from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ColorThief from 'colorthief';
import { PostShareService } from 'src/app/_service/common/post-share.service';
import { SkeletonService } from 'src/app/_service/common/skeleton.service';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { CommentService } from 'src/app/_service/models/comment.service';
import { LikeService } from 'src/app/_service/models/like.service';
import { ShareService } from 'src/app/_service/models/share.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { ValidationModelService } from 'src/app/_service/validator/validation-model.service';
import {
  iconsObject,
  MaterialModule,
  MediaEnum,
  Post,
  PostEnum,
  Share,
  ShareEnum,
  User,
} from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, CommonModule, NgStyle],
  providers: [LikeService, CommentService, ShareService, PostShareService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  @Input() data!: Post | Share;
  @Input() index!: number;
  @Input() run!: number;
  PostEnum = PostEnum;
  ShareEnum = ShareEnum;

  iconsObject = iconsObject;
  buttonPosition!: Position;
  @ViewChild('postElement') postElement!: ElementRef;
  @ViewChild('comment') commentElement!: ElementRef;
  @ViewChild('like') likeElement!: ElementRef;
  colorThief: ColorThief = new ColorThief();

  @ViewChild('postImage1', { static: false })
  postImage1!: ElementRef<HTMLImageElement>;
  @ViewChild('postImage2', { static: false })
  postImage2!: ElementRef<HTMLImageElement>;
  @ViewChild('postImage3', { static: false })
  postImage3!: ElementRef<HTMLImageElement>;

  @ViewChild('profile', { static: false })
  profile!: ElementRef<HTMLImageElement>;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  @ViewChild('postElement', { static: false })
  postContainer!: ElementRef<HTMLDivElement>;

  shouldAutoplay = true;
  clickTimeout: any;

  isPost(data: Post | Share): data is Post {
    return (data as Post).post_medias_id !== undefined;
  }

  isShare(data: Post | Share): data is Share {
    return (data as Share).share_media_id !== undefined;
  }

  constructor(
    private dialogService: DialogService,
    private shadow: ShadowService,
    protected valiationService: ValidationModelService,
    private elementRef: ElementRef,
    private dialog: MatDialog,
    private postShareService: PostShareService,
    protected _skeletonService: SkeletonService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  getProperty(property: 'name' | 'profile_picture' | 'id' | 'type'): any {
    return this.postShareService.getProperty(property, this.data);
  }

  private hasAppliedColor = false;
  ngAfterViewChecked(): void {
    if (this.hasAppliedColor) {
      return;
    }

    if (
      this.postContainer?.nativeElement &&
      ((this.postImage1 && this.postImage1.nativeElement.complete) ||
        (this.postImage2 && this.postImage2.nativeElement.complete) ||
        (this.postImage3 && this.postImage3.nativeElement.complete) ||
        (this.profile && this.profile.nativeElement.complete) ||
        (this.videoPlayer && this.videoPlayer.nativeElement))
    ) {
      this.postShareService?.colorTief(
        this.videoPlayer,
        this.postContainer,
        this.postImage1,
        this.postImage2,
        this.postImage3,
        this.profile,
        this.run,
        this.index
      );
      this.hasAppliedColor = true;
    }
  }

  ngOnChangesVideo(): void {
    this.postShareService.checkAutoplay(this.videoPlayer, this.run, this.index);
  }

  protected onOpenProfile(event: MouseEvent, name: string): void {
    this.postShareService.onOpenProfile(this.postElement, event, name);
  }

  protected getTaggedUsers(data: Post | Share): User[] {
    return this.postShareService.getTaggedUsers(data);
  }

  protected playVideo(videoElement: HTMLVideoElement): void {
    this.postShareService.playVideo(videoElement);
  }

  protected pauseVideo(videoElement: HTMLVideoElement): void {
    this.postShareService.pauseVideo(videoElement);
  }

  protected onClickLike(event: MouseEvent) {
    this.postShareService.onClickLike(event, this.data, false);
  }

  protected onClickComment(event: MouseEvent) {
    this.postShareService.onClickComment(event, this.data, false);
  }

  protected onClickShare(event: MouseEvent) {
    this.postShareService.onClickShare(event, this.data, false);
  }

  protected generateIndexArray(index: number): number[] {
    return this.postShareService.generateIndexArray(index);
  }

  private holdTimeout: any = null;
  private isHolding = false;
  private time = 500;

  protected onOpenPost() {
    if (this.getProperty('id').type === 'REEL') {
      this.pauseVideo(this.videoPlayer.nativeElement);
    }
    this.dialogService.openDialogPost(this.data);
  }

  protected onMouseDown(event: MouseEvent | TouchEvent) {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout);
    }
    this.isHolding = true;

    this.holdTimeout = setTimeout(() => {
      if (this.isHolding) {
        this.onOpenPost();
      }
    }, this.time);
  }

  protected onMouseUp(event: MouseEvent | TouchEvent) {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout);
    }
    this.isHolding = false;
  }

  protected onMouseLeave(event: MouseEvent | TouchEvent) {
    if (this.holdTimeout) {
      clearTimeout(this.holdTimeout);
    }
    this.isHolding = false;
  }

  isVideo(type: string | MediaEnum): boolean {
    return type?.toString() === MediaEnum.VIDEO.toString();
  }

  isImage(type: string | MediaEnum): boolean {
    return type?.toString() === MediaEnum.PHOTO.toString();
  }

  getMediaType(type: string | MediaEnum): string {
    return type?.toString() || '';
  }
}
