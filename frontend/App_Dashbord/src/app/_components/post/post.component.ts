import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import ColorThief from 'colorthief';
import { throttle } from 'lodash';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { ShareEnum } from 'src/app/_type/enum/share.enum';
import { Post } from 'src/app/_type/models/post';
import { Share } from 'src/app/_type/models/share';
import { User } from 'src/app/_type/models/user';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf, NgStyle],
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
  colorThief: ColorThief = new ColorThief();

  @ViewChild('postImage1', { static: false })
  postImage1!: ElementRef<HTMLImageElement>;
  @ViewChild('postImage2', { static: false })
  postImage2!: ElementRef<HTMLImageElement>;
  @ViewChild('postImage3', { static: false })
  postImage3!: ElementRef<HTMLImageElement>;

  @ViewChild('videoPlayer', { static: false })
  videoPlayer!: ElementRef<HTMLVideoElement>;

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
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.videoPlayer && this.postContainer) {
      const videoElement = this.videoPlayer.nativeElement;
      const containerElement = this.postContainer.nativeElement;
      videoElement.crossOrigin = 'anonymous';

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
    this.checkAutoplay();
  }

  ngOnChanges(): void {
    this.checkAutoplay();
  }

  protected checkAutoplay(): void {
    if (
      this.videoPlayer?.nativeElement instanceof HTMLVideoElement &&
      this.videoPlayer?.nativeElement !== null
    ) {
      if (this.run === this.index) {
        this.videoPlayer?.nativeElement?.play()
          .catch((error) => console.error('Autoplay error:', error));
      } else {
        this.videoPlayer!.nativeElement?.pause();
      }
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

  playVideo(videoElement: HTMLVideoElement): void {
    // console.log(`Attempting to play video with id: ${videoElement.id}`);
    if (videoElement && videoElement?.paused) {
      videoElement.muted = false;
      videoElement.volume = 1;
      videoElement.play().catch((error) => {
        console.error(
          `Autoplay blocked for video with id: ${videoElement.id}. Playing after interaction.`,
          error
        );
      });
    }
    // } else {
    //   console.log(`Video with id: ${videoElement.id} is already playing.`);
    // }
  }

  pauseVideo(videoElement: HTMLVideoElement): void {
    // console.log(`Pausing video with id: ${videoElement.id}`);
    if (!videoElement?.paused) {
      videoElement.muted = true;
      videoElement.pause();
    }
    // } else {
    //   console.log(`Video with id: ${videoElement.id} is already paused.`);
    // }
  }
}
