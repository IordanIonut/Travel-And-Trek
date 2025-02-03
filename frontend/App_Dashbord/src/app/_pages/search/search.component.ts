import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MastheadComponent } from 'src/app/_components/masthead/masthead.component';
import { FilterSeach } from 'src/app/_type/filters/filter';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { GroupComponent } from '../../_components/group/group.component';
import { PlaceComponent } from '../../_components/place/place.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from 'src/app/_service/models/user.service';
import { FormsModule, NgModel } from '@angular/forms';
import { GroupService } from 'src/app/_service/models/group.service';
import { environment } from 'src/app/environments/environment';
import { error } from 'console';
import { GroupDTO } from 'src/app/_type/dto/group.dto';
import { Post } from 'src/app/_type/models/post';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { PostService } from 'src/app/_service/models/post.service';
import { PostComponent } from 'src/app/_components/post/post.component';
import { errorMonitor } from 'events';
import { Hastag } from 'src/app/_type/models/hashtag';
import { HashtagService } from 'src/app/_service/models/hashtag.service';
import { env } from 'process';
import { User } from 'src/app/_type/models/user';
import { LikeService } from 'src/app/_service/models/like.service';
import { UserComponent } from 'src/app/_components/user/user.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MaterialModule,
    MastheadComponent,
    NgFor,
    GroupComponent,
    FormsModule,
    PostComponent,
    NgIf,
    UserComponent,
    HttpClientModule,
  ],
  templateUrl: './search.component.html',
  providers: [
    UserService,
    GroupService,
    LikeService,
    PostService,
    ShadowService,
    HashtagService,
  ],
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent {
  type!: string;
  search!: string;
  selectedValues!: string[];
  filters: FilterSeach[] = [
    { value: 'location', icon: 'location_on', name: 'Location' },
    {
      value: 'people',
      icon: 'person',
      name: 'Person',
    },
    {
      value: 'group',
      icon: 'group',
      name: 'Group',
    },
    { value: 'post', icon: 'pages', name: 'Post' },
    { value: 'tag', icon: 'tag', name: 'Tag' },
  ];

  peoples: { index: number; data: UserDTO[] }[] = [{ index: 0, data: [] }];
  groups: { index: number; data: GroupDTO[] }[] = [{ index: 0, data: [] }];
  posts: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  tagsPost: { index: number; data: Post[] }[] = [{ index: 0, data: [] }];
  tagsUser: { index: number; data: UserDTO[] }[] = [{ index: 0, data: [] }];

  indexPeoples: number = 0;
  indexGroups: number = 0;
  indexPosts: number = 0;
  indexTags: number = 0;

  protected isLoadingPeople = false;
  protected isLoadingGroups = false;
  protected isLoadingPosts = false;
  protected isLoadingTags = false;

  index = [0];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private groupService: GroupService,
    private postService: PostService,
    private hashtagService: HashtagService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe((params) => {
      const type = params['type'];
      this.selectedValues =
        type === 'all' ? this.filters?.map((item) => item.value) : [type];
      this.search = params['search'];

      const isFound = this.selectedValues.some((selectedValue) =>
        this.filters.some((filter) => filter.value === selectedValue)
      );

      if (!isFound && this.filters?.length !== this.selectedValues?.length) {
        this.router?.navigate(['/dashboard/feet']);
      }
    });

    this.fetchSearch();
  }

  protected onToggleChange(event: any) {
    this.selectedValues = event.value;

    if (!this.onConstrainToogle(this.filters[1].value)) {
      this.peoples = [{ index: 0, data: [] }];
      this.indexPeoples = 0;
    }
    if (!this.onConstrainToogle(this.filters[2].value)) {
      this.groups = [{ index: 0, data: [] }];
      this.indexGroups = 0;
    }
    if (!this.onConstrainToogle(this.filters[3].value)) {
      this.posts = [{ index: 0, data: [] }];
      this.indexPosts = 0;
    }
    if (!this.onConstrainToogle(this.filters[4].value)) {
      this.tagsPost = [{ index: 0, data: [] }];
      this.tagsUser = [{ index: 0, data: [] }];
      this.indexTags = 0;
    }
    this.fetchSearch();
  }

  protected onConstrainToogle(value: string): string | undefined {
    return this.selectedValues?.find((item) => item === value);
  }

  private fetchSearch() {
    const isPeople = this.onConstrainToogle(this.filters[1].value);
    const isGroup = this.onConstrainToogle(this.filters[2].value);
    const isPost = this.onConstrainToogle(this.filters[3].value);
    const isTag = this.onConstrainToogle(this.filters[4].value);

    if (
      this.isLoadingPeople ||
      (isPeople &&
        (!this.peoples || this.peoples[this.indexPeoples].data.length === 0))
    ) {
      this.userService
        .findUsersAndFriendsByName(
          environment.user.name,
          this.search,
          this.indexPeoples,
          environment.number
        )
        .subscribe({
          next: (data: UserDTO[]) => {
            if (this.indexPeoples === 0) {
              if (!this.peoples[this.indexPeoples]) {
                this.peoples[this.indexPeoples] = {
                  index: this.indexPeoples,
                  data: [],
                };
              }
              this.peoples[this.indexPeoples].data = data;
            } else {
              this.peoples.push({ index: this.indexPeoples, data });
            }
            this.isLoadingPeople = false;
          },
          error: (error: Error) => console.log(error),
        });
    }

    if (
      this.isLoadingGroups ||
      (isGroup &&
        (!this.groups || this.groups[this.indexGroups].data.length === 0))
    ) {
      this.groupService
        .findGroupsByName(
          environment.user.name,
          this.search,
          this.indexGroups,
          environment.number
        )
        .subscribe({
          next: (data: GroupDTO[]) => {
            if (this.indexPeoples === 0) {
              if (!this.groups[this.indexGroups]) {
                this.groups[this.indexGroups] = {
                  index: this.indexGroups,
                  data: [],
                };
              }
              this.groups[this.indexGroups].data = data;
            } else {
              this.groups.push({ index: this.indexGroups, data });
            }
            this.isLoadingGroups = false;
          },
          error: (error: Error) => console.log(error),
        });
    }

    if (
      this.isLoadingPosts ||
      (isPost && (!this.posts || this.posts[this.indexPosts].data.length === 0))
    ) {
      this.postService
        .getPostBySearch(this.search, this.indexPosts, environment.number)
        .subscribe({
          next: (data: Post[]) => {
            if (this.indexPosts === 0) {
              if (!this.posts[this.indexPosts]) {
                this.posts[this.indexPosts] = {
                  index: this.indexPosts,
                  data: [],
                };
              }
              this.posts[this.indexPosts].data = data;
            } else {
              this.posts.push({ index: this.indexPosts, data });
            }
            this.isLoadingPosts = false;
          },
          error: (error: Error) => console.log(error),
        });
    }

    if (
      this.isLoadingTags ||
      (isTag &&
        (!this.tagsPost || this.tagsPost[this.indexTags].data.length === 0))
    ) {
      this.hashtagService
        .getPostByTag([...this.search], this.indexTags, environment.number)
        .subscribe({
          next: (data: Post[]) => {
            // console.log(data);
            if (this.indexTags === 0) {
              if (!this.tagsPost[this.indexTags]) {
                this.tagsPost[this.indexTags] = {
                  index: this.indexTags,
                  data: [],
                };
              }
              this.tagsPost[this.indexTags].data = data;
            } else {
              this.tagsPost.push({ index: this.indexTags, data });
            }
            this.isLoadingTags = false;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
      this.hashtagService
        .getUserByTag(
          environment.user.name,
          [...this.search],
          this.indexTags,
          environment.number
        )
        .subscribe({
          next: (data: UserDTO[]) => {
            // console.log(data);
            if (this.indexTags === 0) {
              if (!this.tagsUser[this.indexTags]) {
                this.tagsUser[this.indexTags] = {
                  index: this.indexTags,
                  data: [],
                };
              }
              this.tagsUser[this.indexTags].data = data;
            } else {
              this.tagsUser.push({ index: this.indexTags, data });
            }
            this.isLoadingTags = false;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
    // this.cdr.detectChanges();
  }

  protected onScroll(event: any) {
    const element = event.target;
    const threshold = 100;

    const isNearBottom =
      element.scrollHeight - element.scrollTop <=
      element.clientHeight + threshold;
    if (
      isNearBottom &&
      !this.isLoadingPeople &&
      !this.isLoadingGroups &&
      !this.isLoadingPosts &&
      !this.isLoadingTags
    ) {
      if (this.onConstrainToogle(this.filters[1].value)) {
        this.indexPeoples++;
        this.isLoadingPeople = true;
      }
      if (this.onConstrainToogle(this.filters[2].value)) {
        this.indexGroups++;
        this.isLoadingGroups = true;
      }
      if (this.onConstrainToogle(this.filters[3].value)) {
        this.indexPosts++;
        this.isLoadingPosts = true;
      }
      if (this.onConstrainToogle(this.filters[4].value)) {
        this.indexTags++;
        this.isLoadingTags = true;
      }
      this.index.push(
        Math.max(
          this.indexPeoples,
          this.indexGroups,
          this.indexPosts,
          this.indexTags
        )
      );
      this.fetchSearch();
    }
  }
}
