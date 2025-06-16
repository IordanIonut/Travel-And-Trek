import { isPlatformBrowser, NgFor, NgIf, NgStyle } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostService } from 'projects/app-create/src/lib/_service/_model/post.service';
import {
  AlertComponent,
  Environment,
  GenderEnum,
  iconsObject,
  MaterialModule,
  MediaEnum,
  Mode,
  Post,
  PostEnum,
  ShadowService,
  Share,
  ShareEnum,
  ShareService,
  User,
  ValidationModelService,
} from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/dist/app-core';

@Component({
    selector: 'app-preview-post',
    imports: [
        MaterialModule,
        NgFor,
        NgIf,
        NgStyle,
        AlertComponent,
        HttpClientModule,
    ],
    providers: [ShareService, PostService, ValidationModelService],
    templateUrl: './preview-post.component.html',
    styleUrl: './preview-post.component.scss'
})
export class PreviewPostComponent {
  @Input() data!: Post;
  @Input() index!: number;
  @Input() run!: number;
  PostEnum = PostEnum;
  ShareEnum = ShareEnum;

  iconsObject = iconsObject;
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
    private cdr: ChangeDetectorRef,
    private validationService: ValidationModelService,
    private _postService: PostService,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(MAT_DIALOG_DATA) data: { data: Post }
  ) {
    this.data = data.data;
    console.log(data.data);

    // this.data = {
    //   id: {
    //     id: '',
    //     type: PostEnum.POST,
    //   },
    //   post_user_id: {
    //     id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //     user_hashtag_id: [],
    //     name: 'wesley.vonrueden',
    //     email: 'marisela.weissnat@hotmail.com',
    //     location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //     password:
    //       '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //     bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //     date_create: new Date(),
    //     profile_picture:
    //       'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //     gender: GenderEnum.F,
    //     date_of_birth: new Date(),
    //     date_last_update: new Date(),
    //     qr_code: 'user-wesley.vonrueden',
    //   },
    //   post_medias_id: [
    //     {
    //       id: {
    //         id: '',
    //         type: 1,
    //       },
    //       url: 'https://picsum.photos/500/500/?random=0',
    //       media_user_id: {
    //         id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //         user_hashtag_id: [],
    //         name: 'wesley.vonrueden',
    //         email: 'marisela.weissnat@hotmail.com',
    //         location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //         password:
    //           '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //         bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //         date_create: new Date(),
    //         profile_picture:
    //           'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //         gender: GenderEnum.F,
    //         date_of_birth: new Date(),
    //         date_last_update: new Date(),
    //         qr_code: 'user-wesley.vonrueden',
    //       },
    //       media_group_id: null,
    //       latitude: 0,
    //       longitude: 0,
    //       create_at: new Date(),
    //     },
    //     {
    //       id: {
    //         id: '',
    //         type: 1,
    //       },
    //       url: 'https://picsum.photos/500/500/?random=1',
    //       media_user_id: {
    //         id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //         user_hashtag_id: [],
    //         name: 'wesley.vonrueden',
    //         email: 'marisela.weissnat@hotmail.com',
    //         location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //         password:
    //           '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //         bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //         date_create: new Date(),
    //         profile_picture:
    //           'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //         gender: GenderEnum.F,
    //         date_of_birth: new Date(),
    //         date_last_update: new Date(),
    //         qr_code: 'user-wesley.vonrueden',
    //       },
    //       media_group_id: null,
    //       latitude: 0,
    //       longitude: 0,
    //       create_at: new Date(),
    //     },
    //     {
    //       id: {
    //         id: '',
    //         type: 1,
    //       },
    //       url: 'https://picsum.photos/500/500/?random=2',
    //       media_user_id: {
    //         id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //         user_hashtag_id: [],
    //         name: 'wesley.vonrueden',
    //         email: 'marisela.weissnat@hotmail.com',
    //         location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //         password:
    //           '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //         bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //         date_create: new Date(),
    //         profile_picture:
    //           'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //         gender: GenderEnum.F,
    //         date_of_birth: new Date(),
    //         date_last_update: new Date(),
    //         qr_code: 'user-wesley.vonrueden',
    //       },
    //       media_group_id: null,
    //       latitude: 0,
    //       longitude: 0,
    //       create_at: new Date(),
    //     },
    //     {
    //       id: {
    //         id: '',
    //         type: 1,
    //       },
    //       url: 'https://picsum.photos/500/500/?random=3',
    //       media_user_id: {
    //         id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //         user_hashtag_id: [],
    //         name: 'wesley.vonrueden',
    //         email: 'marisela.weissnat@hotmail.com',
    //         location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //         password:
    //           '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //         bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //         date_create: new Date(),
    //         profile_picture:
    //           'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //         gender: GenderEnum.F,
    //         date_of_birth: new Date(),
    //         date_last_update: new Date(),
    //         qr_code: 'user-wesley.vonrueden',
    //       },
    //       media_group_id: null,
    //       latitude: 0,
    //       longitude: 0,
    //       create_at: new Date(),
    //     },
    //     {
    //       id: {
    //         id: '',
    //         type: 1,
    //       },
    //       url: 'https://picsum.photos/500/500/?random=4',
    //       media_user_id: {
    //         id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //         user_hashtag_id: [],
    //         name: 'wesley.vonrueden',
    //         email: 'marisela.weissnat@hotmail.com',
    //         location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //         password:
    //           '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //         bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //         date_create: new Date(),
    //         profile_picture:
    //           'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //         gender: GenderEnum.F,
    //         date_of_birth: new Date(),
    //         date_last_update: new Date(),
    //         qr_code: 'user-wesley.vonrueden',
    //       },
    //       media_group_id: null,
    //       latitude: 0,
    //       longitude: 0,
    //       create_at: new Date(),
    //     },
    //     {
    //       id: {
    //         id: '',
    //         type: 1,
    //       },
    //       url: 'https://picsum.photos/500/500/?random=5',
    //       media_user_id: {
    //         id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //         user_hashtag_id: [],
    //         name: 'wesley.vonrueden',
    //         email: 'marisela.weissnat@hotmail.com',
    //         location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //         password:
    //           '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //         bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //         date_create: new Date(),
    //         profile_picture:
    //           'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //         gender: GenderEnum.F,
    //         date_of_birth: new Date(),
    //         date_last_update: new Date(),
    //         qr_code: 'user-wesley.vonrueden',
    //       },
    //       media_group_id: null,
    //       latitude: 0,
    //       longitude: 0,
    //       create_at: new Date(),
    //     },
    //     {
    //       id: {
    //         id: '',
    //         type: 1,
    //       },
    //       url: 'https://picsum.photos/500/500/?random=8',
    //       media_user_id: {
    //         id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //         user_hashtag_id: [],
    //         name: 'wesley.vonrueden',
    //         email: 'marisela.weissnat@hotmail.com',
    //         location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //         password:
    //           '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //         bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //         date_create: new Date(),
    //         profile_picture:
    //           'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //         gender: GenderEnum.F,
    //         date_of_birth: new Date(),
    //         date_last_update: new Date(),
    //         qr_code: 'user-wesley.vonrueden',
    //       },
    //       media_group_id: null,
    //       latitude: 0,
    //       longitude: 0,
    //       create_at: new Date(),
    //     },
    //   ],
    //   post_hashtag_id: [
    //     {
    //       id: '',
    //       name: 'throughthetrees',
    //     },
    //     {
    //       id: '',
    //       name: 'forest_masters',
    //     },
    //     {
    //       id: '',
    //       name: 'sunny',
    //     },
    //     {
    //       id: '',
    //       name: 'lovesun',
    //     },
    //     {
    //       id: '',
    //       name: 'solarsystem',
    //     },
    //   ],
    //   post_group_id: null,
    //   tagged_users: [],
    //   description:
    //     'a dirt road with a steep hill in the background and trees on both sides of it, with a sign on the side of the road',
    //   visible: true,
    //   create_at: new Date(),
    //   update_at: new Date(),

    //   // id: {
    //   //   id: '101156309202718044',
    //   //   type: PostEnum.REEL,
    //   // },
    //   // post_user_id: {
    //   //   id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //   //   user_hashtag_id: [],
    //   //   name: 'wesley.vonrueden',
    //   //   email: 'marisela.weissnat@hotmail.com',
    //   //   location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //   //   password:
    //   //     '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //   //   bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //   //   date_create: new Date(),
    //   //   profile_picture:
    //   //     'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //   //   gender: GenderEnum.F,
    //   //   date_of_birth: new Date(),
    //   //   date_last_update: new Date(),
    //   //   qr_code: 'user-wesley.vonrueden',
    //   // },
    //   // post_group_id: null,
    //   // post_medias_id: [
    //   //   {
    //   //     id: {
    //   //       id: '2716321917414228528',
    //   //       type: MediaEnum.VIDEO,
    //   //     },
    //   //     media_user_id: {
    //   //       id: '11cead71-b94f-4ff9-a97c-60886329d64f',
    //   //       user_hashtag_id: [],
    //   //       name: 'wesley.vonrueden',
    //   //       email: 'marisela.weissnat@hotmail.com',
    //   //       location: 'Apt. 593 657 Theron Passage, Franciscoshire, WA 70521',
    //   //       password:
    //   //         '$2a$10$8/T90npRekf1Tv9JkGZt6utd8NV3JAUH0KLZ5nrckb9Rag7EsfgQm',
    //   //       bio: 'java.util.stream.SliceOps$1@22d9cd6',
    //   //       date_create: new Date(),
    //   //       profile_picture:
    //   //         'https://picsum.photos/seed/adf75d4e-465f-42e8-9880-3c4b2738df88/600/600',
    //   //       gender: GenderEnum.F,
    //   //       date_of_birth: new Date(),
    //   //       date_last_update: new Date(),
    //   //       qr_code: 'user-wesley.vonrueden',
    //   //     },
    //   //     media_group_id: null,
    //   //     url: 'https://cdn.pixabay.com/video/2023/10/23/186198-877345274_medium.mp4',
    //   //     latitude: 34.21500382642394,
    //   //     longitude: 89.02273291680251,
    //   //     create_at: new Date(),
    //   //   },
    //   // ],
    //   // post_hashtag_id: [],
    //   // tagged_users: [
    //   //   {
    //   //     id: '5eda93d0-1e66-489a-8c9f-e571b72ad72a',
    //   //     user_hashtag_id: [
    //   //       {
    //   //         id: '718095120867347728',
    //   //         name: 'ea',
    //   //       },
    //   //     ],
    //   //     name: 'lorenzo.schmidt',
    //   //     email: 'reuben.altenwerth@gmail.com',
    //   //     location: '72841 Witting Green, South Toryport, NV 81535-9044',
    //   //     password:
    //   //       '$2a$10$NO9X9JyGbKmp3FTYrqb.EeNo7qL5iWWRh5v3.9rD4fDMMAEjy4IHO',
    //   //     bio: 'java.util.stream.SliceOps$1@1b3e3ff5',
    //   //     date_create: new Date(),
    //   //     profile_picture:
    //   //       'https://picsum.photos/seed/4f21fba4-96cb-4f32-bf2e-00ccf2bac2cf/600/600',
    //   //     gender: GenderEnum.F,
    //   //     date_of_birth: new Date(),
    //   //     date_last_update: new Date(),
    //   //     qr_code: 'user-lorenzo.schmidt',
    //   //   },
    //   // ],
    //   // description: 'Quidem corrupti in similique sunt. Et eos suscipit.',
    //   // visible: true,
    //   // create_at: new Date(),
    //   // update_at: new Date(),
    // };
  }

  ngOnInit(): void {}

  onSavePost() {
    this._postService.createPost(this.data).subscribe({
      next: (response) => {
        console.log(response);
        this.showAlertMessage(
          'Save Post',
          'Post has been saved.',
          Environment.duration,
          Mode.SUCCESS
        );
        const url =
          'dashboard/profile?type=user&name=' + this.data.post_user_id?.name;
        this.route.navigate([url]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProperty(property: 'name' | 'profile_picture' | 'id' | 'type'): any {
    if (this.validationService.isPost(this.data)) {
      switch (property) {
        case 'name': {
          if (this.validationService.isGroup(this.data.post_group_id!))
            return this.data.post_group_id.name;
          if (this.validationService.isUser(this.data.post_user_id!))
            return this.data.post_user_id.name;
          return '';
        }
        case 'profile_picture': {
          if (this.validationService.isUser(this.data.post_user_id!)) {
            return this.data.post_user_id.profile_picture;
          }
          if (this.validationService.isGroup(this.data.post_group_id!)) {
            return this.data.post_group_id.url;
          }
          return '';
        }
        case 'id': {
          return this.data.id;
        }
      }
    }
    if (this.validationService.isShare(this.data)) {
      switch (property) {
        case 'id': {
          return this.data.shareId.id;
        }
      }
    }
  }

  ngAfterViewInit(): void {
    this.colorTief(
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
    this.checkAutoplay(this.videoPlayer, this.run, this.index);
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
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
    if (!videoElement?.paused) {
      videoElement.muted = true;
      videoElement.pause();
    }
  }

  protected generateIndexArray(index: number): number[] {
    return index !== 0 ? Array.from({ length: index }, (_, i) => i) : [0];
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

  private colorTief(
    videoPlayer: ElementRef<HTMLVideoElement>,
    postContainer: ElementRef<HTMLDivElement>,
    postImage1: ElementRef<HTMLImageElement>,
    postImage2: ElementRef<HTMLImageElement>,
    postImage3: ElementRef<HTMLImageElement>,
    profile: ElementRef<HTMLImageElement>,
    run: number,
    index: number
  ) {
    if (videoPlayer && postContainer) {
      this.setupVideoAutoplayObserver(videoPlayer, postContainer, run, index);
    }
    if (
      postImage1 !== undefined &&
      postImage2 !== undefined &&
      postImage3 !== undefined &&
      postContainer !== undefined
    ) {
      const imgElement1 = postImage1!.nativeElement;
      const imgElement2 = postImage2.nativeElement;
      const imgElement3 = postImage3.nativeElement;
      const containerElement = postContainer.nativeElement;
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
    } else if (postImage1 !== undefined && postImage2 && postContainer) {
      const imgElement1 = postImage1!.nativeElement;
      const imgElement2 = postImage2.nativeElement;
      const containerElement = postContainer.nativeElement;
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
    } else if (postImage1 !== undefined && postContainer !== undefined) {
      const imgElement = postImage1!.nativeElement;
      const containerElement = postContainer.nativeElement;
      imgElement.crossOrigin = 'anonymous';
      if (imgElement.complete) {
        this.shadow.applyShadowToContainer1(imgElement, containerElement);
      } else {
        imgElement.addEventListener('load', () => {
          this.shadow.applyShadowToContainer1(imgElement, containerElement);
        });
      }
    } else if (
      postImage1 === undefined &&
      postImage2 === undefined &&
      postImage3 === undefined &&
      videoPlayer === undefined
    ) {
      const imgElement = profile!.nativeElement;
      const containerElement = postContainer.nativeElement;
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

  private checkAutoplay(
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

  private setupVideoAutoplayObserver(
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
        { threshold: 0.5 }
      );

      observer.observe(videoElement);
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

  alertMessage: string = '';
  errorMessage: string = '';
  showAlert: boolean = false;
  mode: Mode = Mode.ERROR;
  private showAlertMessage(
    subject: string,
    message: string,
    duration: number,
    mode: Mode
  ) {
    this.alertMessage = message;
    this.errorMessage = subject;
    this.showAlert = true;
    this.mode = mode;
    setTimeout(() => {
      this.showAlert = false;
    }, duration);
  }
}
