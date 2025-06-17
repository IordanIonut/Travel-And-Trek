import { ElementRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DialogService } from '../dialog/dialog.service';
import { ValidationModelService } from '../validator/validation-model.service';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';
import { Post, ShadowService, Share, User } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class PostShareService {
  buttonPosition!: Position;
  shouldAutoplay = true;
  clickTimeout: any;

  constructor(
    private dialogService: DialogService,
    private shadow: ShadowService,
    private validationService: ValidationModelService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getProperty(
    property: 'name' | 'profile_picture' | 'id' | 'type',
    data: Post | Share
  ): any {
    if (this.validationService.isPost(data)) {
      switch (property) {
        case 'name': {
          if (this.validationService.isGroup(data.post_group_id!))
            return data.post_group_id.name;
          if (this.validationService.isUser(data.post_user_id!))
            return data.post_user_id.name;
          return '';
        }
        case 'profile_picture': {
          if (this.validationService.isUser(data.post_user_id!)) {
            return data.post_user_id.profile_picture;
          }
          if (this.validationService.isGroup(data.post_group_id!)) {
            return data.post_group_id.url;
          }
          return '';
        }
        case 'id': {
          return data.id;
        }
      }
    }
    if (this.validationService.isShare(data)) {
      switch (property) {
        case 'id': {
          return data.shareId.id;
        }
      }
    }
  }

  getTaggedUsers(data: Post | Share): User[] {
    if (this.validationService.isPost(data)) {
      return data.post_hashtag_id ? data.tagged_users : [];
    } else if (this.validationService.isShare(data)) {
      return data.share_post_id ? data.share_post_id.tagged_users : [];
    }

    return [];
  }

  playVideo(videoElement: HTMLVideoElement): void {
    if (videoElement.paused) {
      try {
        videoElement.play();
        console.log('Video is playing successfully.');
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  }

  colorTief(
    videoPlayer: ElementRef<HTMLVideoElement> | undefined,
    postContainer: ElementRef<HTMLDivElement>,
    postImage1?: ElementRef<HTMLImageElement>,
    postImage2?: ElementRef<HTMLImageElement>,
    postImage3?: ElementRef<HTMLImageElement>,
    profile?: ElementRef<HTMLImageElement>,
    run?: number,
    index?: number
  ) {
    if (videoPlayer && postContainer) {
      this.setupVideoAutoplayObserver(videoPlayer, postContainer, run!, index!);
    }
    const containerElement = postContainer.nativeElement;
    const applyShadowAfterLoad = (
      images: HTMLImageElement[],
      applyShadowFn: (...args: any[]) => void
    ) => {
      images.forEach((img) => {
        if (img.crossOrigin !== 'anonymous') {
          img.crossOrigin = 'anonymous';
        }
      });

      if (images.every((img) => img.complete)) {
        applyShadowFn(...images, containerElement);
        return;
      }

      images.forEach((img) => {
        if (!img.complete) {
          const onLoad = () => {
            if (images.every((i) => i.complete)) {
              applyShadowFn(...images, containerElement);
            }
          };
          img.addEventListener('load', onLoad, { once: true });
        }
      });
    };

    if (postImage1 && postImage2 && postImage3) {
      applyShadowAfterLoad(
        [
          postImage1.nativeElement,
          postImage2.nativeElement,
          postImage3.nativeElement,
        ],
        this.shadow.applyShadowToContainer3.bind(this.shadow)
      );
    } else if (postImage1 && postImage2) {
      applyShadowAfterLoad(
        [postImage1.nativeElement, postImage2.nativeElement],
        this.shadow.applyShadowToContainer2.bind(this.shadow)
      );
    } else if (postImage1) {
      applyShadowAfterLoad(
        [postImage1.nativeElement],
        this.shadow.applyShadowToContainer1.bind(this.shadow)
      );
    } else if (
      !postImage1 &&
      !postImage2 &&
      !postImage3 &&
      !videoPlayer &&
      profile
    ) {
      applyShadowAfterLoad(
        [profile.nativeElement],
        this.shadow.applyShadowToContainer1.bind(this.shadow)
      );
    }
  }

  generateIndexArray(index: number): number[] {
    return index !== 0 ? Array.from({ length: index }, (_, i) => i) : [0];
  }

  checkAutoplay(
    videoPlayer: ElementRef<HTMLVideoElement>,
    run: number,
    index: number
  ): void {
    const videoElement = videoPlayer?.nativeElement;
    if (videoElement instanceof HTMLVideoElement) {
      if (run === index && videoElement.paused) {
        videoElement?.play();
      } else {
        videoElement?.pause();
      }
    }
  }

  setupVideoAutoplayObserver(
    videoPlayer: ElementRef<HTMLVideoElement>,
    postContainer: ElementRef<HTMLDivElement>,
    run: number,
    index: number
  ): void {
    const videoElement = videoPlayer.nativeElement;
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.checkAutoplay(videoPlayer, run, index);
              this.shadow.updateShadowFromVideo(
                videoElement,
                postContainer.nativeElement
              );
            } else {
              videoElement.pause();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(videoElement);
    }
  }

  onOpenProfile(
    postElement: ElementRef,
    event: MouseEvent,
    name: string
  ): void {
    const buttonElement = event.currentTarget as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    if (postElement !== undefined) {
      const divHeight = postElement.nativeElement.clientHeight;
      // console.log(rect.x + ' ' + rect.y);
      this.buttonPosition = {
        pos_x: rect.x + 470,
        pos_y: rect.y - 190,
      };
      this.dialogService.openDialogProfile(this.buttonPosition, name, 'user');
    }
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

  onOpenLike(
    likeElement: HTMLElement,
    data: Post | Share,
    isPost: boolean
  ): void {
    const rect = likeElement?.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: isPost ? rect.x + 350 : rect.x + 350,
      pos_y: isPost ? rect.y - 40 : rect.y - 40,
    };
    this.dialogService.openDialogSeeValue(
      this.buttonPosition,
      this.getProperty('id', data)!,
      'LIKE',
      true
    );
  }

  onOpenComment(
    commentElement: HTMLElement,
    data: Post | Share,
    isPost: boolean
  ): void {
    const rect = commentElement.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: isPost ? rect.x + 380 : rect.x + 380,
      pos_y: isPost ? rect.y - 40 : rect.y - 40,
    };
    this.dialogService.openDialogSeeValue(
      this.buttonPosition,
      this.getProperty('id', data)!,
      'COMMENT',
      true
    );
  }

  onOpenShare(
    shareElement: HTMLElement,
    data: Post | Share,
    isDialog: boolean
  ): void {
    const rect = shareElement.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: isDialog ? rect.x + 380 : rect.x + 380,
      pos_y: isDialog ? rect.y - 40 : rect.y - 40,
    };
    this.dialogService.openDialogSeeValue(
      this.buttonPosition,
      this.getProperty('id', data)!,
      'SHARE',
      true
    );
  }

  onOpenLikes(
    likeElement: HTMLElement,
    data: Post | Share,
    isDialog: boolean
  ): void {
    const rect = likeElement?.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: isDialog ? rect.x - 130 : rect.x - 130,
      pos_y: isDialog ? rect.y - 360 : rect.y - 360,
    };
    this.dialogService.openDialogLikes(
      this.buttonPosition,
      this.getProperty('id', data)!
    );
  }

  onOpenShares(
    shareElement: HTMLElement,
    data: Post | Share,
    isDialog: boolean
  ): void {
    const rect = shareElement.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: isDialog ? rect.x + 380 : rect.x + 380,
      pos_y: isDialog ? rect.y - 360 : rect.y - 360,
    };
    this.dialogService.openDialogShares(
      this.buttonPosition,
      this.getProperty('id', data)!
    );
  }

  onOpenCommnets(
    commentElement: HTMLElement,
    data: Post | Share,
    isDialog: boolean
  ): void {
    const rect = commentElement.getBoundingClientRect();
    this.buttonPosition = {
      pos_x: isDialog ? rect.x + 150 : rect.x + 150,
      pos_y: isDialog ? rect.y - 360 : rect.y - 360,
    };
    this.dialogService.openDialogComponents(
      this.buttonPosition,
      this.getProperty('id', data)!
    );
  }

  onClickLike(event: MouseEvent, data: Post | Share, isDialog: boolean) {
    event.stopPropagation();
    const likeElement = event.currentTarget as HTMLElement;
    if (!likeElement) {
      console.error('onClickLike: Element not found.');
      return;
    }

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.onOpenLikes(likeElement, data, isDialog);
    } else {
      event.stopPropagation();
      this.clickTimeout = setTimeout(() => {
        this.onOpenLike(likeElement, data, isDialog);
        this.clickTimeout = null;
      }, 300);
    }
  }

  onClickComment(event: MouseEvent, data: Post | Share, isDialog: boolean) {
    event.stopPropagation();
    const commentElement = event.currentTarget as HTMLElement;
    if (!commentElement) {
      console.error('onClickLike: Element not found.');
      return;
    }

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.onOpenCommnets(commentElement, data, isDialog);
    } else {
      event.stopPropagation();
      this.clickTimeout = setTimeout(() => {
        this.onOpenComment(commentElement, data, isDialog);
        this.clickTimeout = null;
      }, 300);
    }
  }

  onClickShare(event: MouseEvent, data: Post | Share, isDialog: boolean) {
    event.stopPropagation();
    const shareElement = event.currentTarget as HTMLElement;
    if (!shareElement) {
      console.error('onClickLike: Element not found.');
      return;
    }

    if (this.clickTimeout) {
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
      this.onOpenShares(shareElement, data, isDialog);
    } else {
      event.stopPropagation();
      this.clickTimeout = setTimeout(() => {
        this.onOpenShare(shareElement, data, isDialog);
        this.clickTimeout = null;
      }, 300);
    }
  }
}
