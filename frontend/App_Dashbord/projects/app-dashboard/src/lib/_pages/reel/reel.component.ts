import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  Environment,
  JwtService,
  MaterialModule,
  Post,
  PostEnum,
  PostService,
  setLoadingOnRequest,
  SkeletonService,
  Story,
  StoryService,
  UserService,
} from 'travel-and-trek-app-core/dist/app-core';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../_components/post/post.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-reel',
  standalone: true,
  imports: [
    MaterialModule,
    MastheadComponent,
    PostComponent,
    HttpClientModule,
    CommonModule,
  ],
  providers: [UserService, PostService, SkeletonService],
  templateUrl: './reel.component.html',
  styleUrl: './reel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReelComponent {
  posts!: Post[];
  index = 0;
  isLoading = false;
  isRun: number = 0;
  story!: Story[];

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private ngZone: NgZone,
    private _jwtService: JwtService,
    protected _skeletonService: SkeletonService,
    private _storyService: StoryService
  ) {}

  ngAfterViewInit(): void {
    this.detectVisibleElement();
  }

  ngOnInit(): void {
    // this._storyService
    //   .findFriendsStory(this._jwtService.getUserInfo()?.name!, 0, 300)
    //   .subscribe({
    //     next: (data: Story[]) => {
    //       this.story = data;
    //     },
    //     error: (error: Error) => {
    //       console.log(error);
    //     },
    //   });

    this.fetchData();
  }

  protected onScroll(event: any) {
    const element = event.target;
    const threshold = 100;

    const isNearBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold;
    if (isNearBottom && !this.isLoading) {
      this.index++;
      this.isLoading = true;
      this.fetchData();
    }
    this.detectVisibleElement();
  }

  detectVisibleElement(): void {
    const container = this.scrollContainer.nativeElement!;
    const children = container.querySelectorAll('app-post');

    children.forEach((child: any) => {
      const nativeEl = child?.shadowRoot?.firstChild || child;
      const rect = nativeEl?.getBoundingClientRect?.();

      if (!rect) return;

      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (isVisible) {
        const id = parseInt(child.id.replace('post-', ''), 10);
        if (!isNaN(id) && this.isRun !== id) {
          this.ngZone.run(() => {
            this.isRun = id;
          });
        }
      }
    });
  }

  protected fetchData() {
    if (this.isLoading || !this.posts || this.posts.length === 0) {
      this.postService
        .getPostByUserFriends(
          this._jwtService.getUserInfo()?.name!,
          PostEnum.REEL,
          this._jwtService.getUserInfo()?.hashtag!,
          this.index,
          Environment.number
        )
        .pipe(setLoadingOnRequest(this._skeletonService))
        .subscribe({
          next: (data: Post[]) => {
            if (this.index === 0) {
              this.posts = data;
            } else {
              this.posts = [...this.posts, ...data];
            }
            this.isLoading = false;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
  }
}
