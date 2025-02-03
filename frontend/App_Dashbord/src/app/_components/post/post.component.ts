import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import ColorThief from 'colorthief';
import { LikesComponent } from 'src/app/_dialogs/likes/likes.component';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { CommentService } from 'src/app/_service/models/comment.service';
import { LikeService } from 'src/app/_service/models/like.service';
import { ShareService } from 'src/app/_service/models/share.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { ValidationModelService } from 'src/app/_service/validator/validation-model.service';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { ShareEnum } from 'src/app/_type/enum/share.enum';
import { Post, PostId } from 'src/app/_type/models/post';
import { Share } from 'src/app/_type/models/share';
import { User } from 'src/app/_type/models/user';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf, NgStyle],
  providers: [LikeService, CommentService, ShareService],
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

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  @ViewChild('postElement', { static: false })
  postContainer!: ElementRef<HTMLDivElement>;

  shouldAutoplay = true;

  isPost(data: Post | Share): data is Post {
    return (data as Post).post_medias_id !== undefined;
  }

  isShare(data: Post | Share): data is Share {
    return (data as Share).share_media_id !== undefined;
  }

  constructor(
    private dialogService: DialogService,
    private shadow: ShadowService,
    private valiationService: ValidationModelService,
    private elementRef: ElementRef,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  getProperty(property: 'name' | 'profile_picture' | 'id' | 'type'): any {
    if (this.valiationService.isPostOrShare(this.data)) {
      switch (property) {
        case 'name': {
          if (this.valiationService.isGroupOrUser(this.data.post_group_id))
            return this.data.post_group_id.name;
          if (this.valiationService.isUserOrGroup(this.data.post_user_id))
            return this.data.post_user_id.name;
          return '';
        }
        case 'profile_picture': {
          if (this.valiationService.isUserOrGroup(this.data.post_user_id))
            return this.data.post_user_id.profile_picture;
          if (this.valiationService.isGroupOrUser(this.data.post_group_id))
            return this.data.post_group_id.url;
          return '';
        }
        case 'id': {
          return this.data.id;
        }
      }
    }
    if (this.valiationService.isShareOrPost(this.data)) {
      switch (property) {
        case 'id': {
          return this.data.share_post_id.id;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    if (this.videoPlayer && this.postContainer) {
      const videoElement = this.videoPlayer.nativeElement;
      const containerElement = this.postContainer.nativeElement;
      videoElement.crossOrigin = 'anonymous';
      this.checkAutoplay();

      videoElement.addEventListener('play', () => {
        this.shadow.updateShadowFromVideo(videoElement, containerElement);
      });
      videoElement.addEventListener('pause', () => {});
      videoElement.addEventListener('ended', () => {
        videoElement.play();
      });
    }
    if (
      this.postImage1 !== undefined &&
      this.postImage2 !== undefined &&
      this.postImage3 !== undefined &&
      this.postContainer !== undefined
    ) {
      const imgElement1 = this.postImage1!.nativeElement;
      const imgElement2 = this.postImage2.nativeElement;
      const imgElement3 = this.postImage3.nativeElement;
      const containerElement = this.postContainer.nativeElement;
      imgElement1.crossOrigin = 'anonymous';
      imgElement2.crossOrigin = 'anonymous';
      imgElement3.crossOrigin = 'anonymous';
      if (
        imgElement1.complete &&
        imgElement2.complete &&
        imgElement3.complete
      ) {
        this.shadow.applyShadowToContainer3(
          imgElement1,
          imgElement2,
          imgElement3,
          containerElement
        );
      } else {
        imgElement1.addEventListener('load', () => {
          this.shadow.applyShadowToContainer3(
            imgElement1,
            imgElement2,
            imgElement3,
            containerElement
          );
        });
      }
    } else if (
      this.postImage1 !== undefined &&
      this.postImage2 &&
      this.postContainer
    ) {
      const imgElement1 = this.postImage1!.nativeElement;
      const imgElement2 = this.postImage2.nativeElement;
      const containerElement = this.postContainer.nativeElement;
      imgElement1.crossOrigin = 'anonymous';
      imgElement2.crossOrigin = 'anonymous';
      if (imgElement1.complete && imgElement2.complete) {
        this.shadow.applyShadowToContainer2(
          imgElement1,
          imgElement2,
          containerElement
        );
      } else {
        imgElement1.addEventListener('load', () => {
          this.shadow.applyShadowToContainer2(
            imgElement1,
            imgElement2,
            containerElement
          );
        });
      }
    } else if (
      this.postImage1 !== undefined &&
      this.postContainer !== undefined
    ) {
      const imgElement = this.postImage1!.nativeElement;
      const containerElement = this.postContainer.nativeElement;
      imgElement.crossOrigin = 'anonymous';
      if (imgElement.complete) {
        this.shadow.applyShadowToContainer1(imgElement, containerElement);
      } else {
        imgElement.addEventListener('load', () => {
          this.shadow.applyShadowToContainer1(imgElement, containerElement);
        });
      }
    }
  }

  ngOnChanges(): void {
    this.checkAutoplay();
  }

  protected checkAutoplay(): void {
    const videoElement = this.videoPlayer?.nativeElement;
    if (videoElement instanceof HTMLVideoElement) {
      if (this.run === this.index && videoElement.paused) {
        videoElement.play().catch((error) => {
          // console.error('Error while trying to play the video:', error);
        });
      } else if (!videoElement.paused) {
        videoElement?.pause();
      }
    } else {
      // console.error('videoPlayer is not a valid HTMLVideoElement.');
    }
  }

  protected onOpenProfile(event: MouseEvent, name: string): void {
    const buttonElement = event.currentTarget as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    if (this.postElement !== undefined) {
      const divHeight = this.postElement.nativeElement.clientHeight;
      // console.log(rect.x + ' ' + rect.y);
      this.buttonPosition = {
        pos_x: rect.x + 470,
        pos_y: rect.y - 190,
      };
      this.dialogService.openDialogProfile(this.buttonPosition, name, 'user');
    }
  }

  protected getTaggedUsers(data: Post | Share): User[] {
    if (this.isPost(data)) {
      return data.post_hashtag_id ? data.tagged_users : [];
    } else if (this.isShare(data)) {
      return data.share_post_id ? data.share_post_id.tagged_users : [];
    }
    return [];
  }

  protected playVideo(videoElement: HTMLVideoElement): void {
    if (videoElement.paused) {
      try {
        videoElement.play();
        console.log('Video is playing successfully.');
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  }

  protected pauseVideo(videoElement: HTMLVideoElement): void {
    // console.log(`Pausing video with id: ${videoElement.id}`);
    if (!videoElement?.paused) {
      videoElement.muted = true;
      videoElement.pause();
    }
    // } else {
    //   console.log(`Video with id: ${videoElement.id} is already paused.`);
    // }
  }

  protected onOpenLike(likeElement: HTMLElement): void {
    const rect = likeElement?.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: rect.x + 270,
      pos_y: rect.y + 30,
    };
    this.dialogService.openDialogSeeValue(
      this.buttonPosition,
      this.getProperty('id')!,
      'LIKE'
    );
  }

  protected onOpenComment(event: MouseEvent): void {
    const buttonElement = event.currentTarget as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: rect.x + 270,
      pos_y: rect.y + 30,
    };
    this.dialogService.openDialogSeeValue(
      this.buttonPosition,
      this.getProperty('id')!,
      'COMMENT'
    );
  }

  protected onOpenShare(event: MouseEvent): void {
    const buttonElement = event.currentTarget as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: rect.x + 270,
      pos_y: rect.y + 30,
    };
    this.dialogService.openDialogSeeValue(
      this.buttonPosition,
      this.getProperty('id')!,
      'SHARE'
    );
  }

  protected onOpenLikes(likeElement: HTMLElement): void {
    const rect = likeElement?.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: rect.x + 0,
      pos_y: rect.y + 30,
    };
    this.dialogService.openDialogLikes(
      this.buttonPosition,
      this.getProperty('id')!
    );
  }

  clickTimeout: any;

  onClickLike(event: MouseEvent) {
    const likeElement = event.currentTarget as HTMLElement;
    if (!likeElement) {
      console.error('onClickLike: Element not found.');
      return;
    }

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.onOpenLikes(likeElement);
    } else {
      this.clickTimeout = setTimeout(() => {
        this.onOpenLike(likeElement);
        this.clickTimeout = null;
      }, 300);
    }
  }

  protected generateIndexArray(index: number): number[] {
    return index !== 0 ? Array.from({ length: index }, (_, i) => i) : [0];
  }
}
