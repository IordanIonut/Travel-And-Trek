import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { NgFor } from '@angular/common';
import { PostComponent } from 'src/app/_components/post/post.component';
import { UserService } from 'src/app/_service/models/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostService } from 'src/app/_service/models/post.service';
import { environment } from 'src/app/environments/environment';
import { error } from 'console';
import { Post } from 'src/app/_type/models/post';
import { animate } from '@angular/animations';
import { PostEnum } from 'src/app/_type/enum/post.enum';

@Component({
  selector: 'app-reel',
  standalone: true,
  imports: [
    MaterialModule,
    MastheadComponent,
    PostComponent,
    HttpClientModule,
    NgFor,
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
    private ngZone: NgZone
  ) {
    this.fetchData();
  }

  ngAfterViewInit(): void {
    this.detectVisibleElement();
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
    const container = this.scrollContainer.nativeElement;
    const children = container.querySelectorAll('app-post');

    children.forEach((child: HTMLElement) => {
      const rect = child.getBoundingClientRect();
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
          environment.user.name,
          PostEnum.REEL,
          environment.user.user_hashtag_id,
          this.index,
          environment.number
        )
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
