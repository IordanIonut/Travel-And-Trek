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
} from 'travel-and-trek-app-core/dist/app-core';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { NgFor, NgIf } from '@angular/common';
import { PostComponent } from 'src/app/_components/post/post.component';
import { UserService } from 'src/app/_service/models/user.service';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from 'src/app/_service/models/post.service';
import {
  setLoadingOnRequest,
  SkeletonService,
} from 'src/app/_service/common/skeleton.service';

@Component({
  selector: 'app-reel',
  standalone: true,
  imports: [
    MaterialModule,
    MastheadComponent,
    PostComponent,
    HttpClientModule,
    NgFor,
    NgIf,
  ],
  providers: [UserService, PostService],
  templateUrl: './reel.component.html',
  styleUrl: './reel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReelComponent {
  posts!: Post[];
  index = 0;
  isLoading = false;
  isRun: number = 0;

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private ngZone: NgZone,
    private _jwtService: JwtService,
    protected _skeletonService: SkeletonService
  ) {}

  ngAfterViewInit(): void {
    this.detectVisibleElement();
  }

  ngOnInit(): void {
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
          [],
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
