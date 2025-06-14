import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import ColorThief from 'colorthief';
import { PostShareService } from 'src/app/_service/common/post-share.service';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
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

  ngAfterViewInit(): void {
    this.postShareService.colorTief(
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
    this.onShadowLefAndRight();
  }

  ngOnChanges(): void {
    this.postShareService.checkAutoplay(this.videoPlayer, this.run, this.index);
    this.cdr.detectChanges();
  }

  ngAfterViewChecked() {
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
    if (this.postImage2 !== undefined && this.conImage2 !== undefined) {
      const imgElement = this.postImage2!.nativeElement;
      const containerElement = this.conImage2.nativeElement;
      imgElement.crossOrigin = 'anonymous';
      if (imgElement.complete) {
        this.shadow.applyShadowToContainer1(imgElement, containerElement);
      } else {
        imgElement.addEventListener('load', () => {
          this.shadow.applyShadowToContainer1(imgElement, containerElement);
        });
      }
    }

    if (this.postImage3 !== undefined && this.conImage3 !== undefined) {
      const imgElement = this.postImage3!.nativeElement;
      const containerElement = this.conImage3.nativeElement;
      imgElement.crossOrigin = 'anonymous';
      if (imgElement.complete) {
        this.shadow.applyShadowToContainer1(imgElement, containerElement);
      } else {
        imgElement.addEventListener('load', () => {
          this.shadow.applyShadowToContainer1(imgElement, containerElement);
        });
      }
    }
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
