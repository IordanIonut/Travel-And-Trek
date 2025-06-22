import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostShareService } from '../../_service/common/post-share.service';
import {
  Icon,
  iconsObject,
  MaterialModule,
  MediaEnum,
  Post,
  PostEnum,
  ShadowService,
  Share,
  ShareEnum,
  ShareService,
  User,
} from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf, NgStyle],
  providers: [ShareService],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  @Input() data!: Post | Share;
  @Input() index!: number;
  @Input() run!: number;
  PostEnum = PostEnum;
  ShareEnum = ShareEnum;

  iconsObjectNow: Record<string, Icon> = iconsObject;
  buttonPosition!: Position;
  @ViewChild('postElement') postElement!: ElementRef;
  @ViewChild('comment') commentElement!: ElementRef;
  @ViewChild('like') likeElement!: ElementRef;

  @ViewChild('postImage1', { static: false })
  postImage1!: ElementRef<HTMLImageElement>;
  @ViewChild('postImage2', { static: false })
  postImage2!: ElementRef<HTMLImageElement>;
  @ViewChild('postImage3', { static: false })
  postImage3!: ElementRef<HTMLImageElement>;

  @ViewChild('profile', { static: false })
  profile!: ElementRef<HTMLImageElement>;
  @ViewChild('conImage3', { static: false })
  conImage3!: ElementRef<HTMLImageElement>;
  @ViewChild('conImage2', { static: false })
  conImage2!: ElementRef<HTMLImageElement>;

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  @ViewChild('postElement', { static: false })
  postContainer!: ElementRef<HTMLDivElement>;

  shouldAutoplay = true;
  clickTimeout: any;

  position = 0;

  isPost(data: Post | Share): data is Post {
    return (data as Post).post_medias_id !== undefined;
  }

  isShare(data: Post | Share): data is Share {
    return (data as Share).share_media_id !== undefined;
  }

  constructor(
    private shadow: ShadowService,
    private postShareService: PostShareService,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) data: { data: Post | Share }
  ) {
    this.data = data.data;
  }

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

  ngOnChanges(): void {
    this.postShareService.checkAutoplay(this.videoPlayer, this.run, this.index);
    this.cdr.detectChanges();
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
    this.postShareService.onClickLike(event, this.data, true);
  }

  protected onClickComment(event: MouseEvent) {
    this.postShareService.onClickComment(event, this.data, true);
  }

  protected onClickShare(event: MouseEvent) {
    this.postShareService.onClickShare(event, this.data, true);
  }

  protected generateIndexArray(index: number): number[] {
    return this.postShareService.generateIndexArray(index);
  }

  private onShadowLefAndRight() {
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

    this.cdr.detectChanges();
  }

  protected onRight() {
    if (
      (this.isPost(this.data) &&
        this.data!.post_medias_id!.length > this.position + 1) ||
      (this.isShare(this.data) &&
        this.data!.share_post_id!.post_medias_id!.length > this.position + 1)
    ) {
      this.position++;
      this.cdr.detectChanges();
      this.onShadowLefAndRight();
    }
  }

  protected onLeft() {
    if (this.position - 1 >= 0) {
      this.position--;
      this.cdr.detectChanges();
      this.onShadowLefAndRight();
    }
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
