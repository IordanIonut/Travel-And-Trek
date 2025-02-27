import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { PostComponent } from '../../_components/post/post.component';
import { StoryComponent } from '../../_components/story/story.component';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { UserService } from 'src/app/_service/models/user.service';
import { HttpClientModule } from '@angular/common/http';
import { StoryService } from 'src/app/_service/models/story.service';
import { environment } from 'src/app/environments/environment';
import { Story } from 'src/app/_type/models/story';
import { error } from 'console';
import { PostService } from 'src/app/_service/models/post.service';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { Post } from 'src/app/_type/models/post';
import { random } from 'lodash';
import { FollowService } from 'src/app/_service/models/follower.service';
import { env } from 'process';
import { UserDTO } from 'src/app/_type/dto/user.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    StoryComponent,
    MastheadComponent,
    HttpClientModule,
  ],
  providers: [UserService, StoryService, PostService, FollowService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  storyPage: number = 0;

  story!: Story[];
  constructor(
    private cdr: ChangeDetectorRef,
    private storyService: StoryService,
    private postService: PostService,
    private followerService: FollowService
  ) {
    this.storyService
      .findFriendsStory(environment.user.name, this.storyPage, 30)
      .subscribe({
        next: (data: Story[]) => {
          this.story = data;
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    this.postService
      .getPostByUserFriends(
        environment.user.name,
        PostEnum.REEL,
        environment.user.user_hashtag_id,
        0,
        10
      )
      .subscribe({
        next: (data: Post[]) => {
          console.log(data);
        },
        error: (error: Error) => {
          console.log(error);
        },
      });

    this.followerService
      .findUserSuggestions(
        environment.user.name,
        environment.user.user_hashtag_id,
        0,
        10
      )
      .subscribe({
        next: (data: UserDTO[]) => {
          console.log(data);
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    this.generate();
  }

  private generate() {
    console.log(Math.floor(Math.random() * 11));
  }
}
