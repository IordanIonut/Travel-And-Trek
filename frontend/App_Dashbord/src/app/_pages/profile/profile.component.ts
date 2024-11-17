import { NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  MaterialModule,
  SetThemeService,
} from 'travel-and-trek-app-core/dist/app-core';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { PostComponent } from '../../_components/post/post.component';
import { StoryComponent } from '../../_components/story/story.component';
import { ReelComponent } from '../reel/reel.component';
import { PlaceComponent } from '../../_components/place/place.component';
import { PersonComponent } from '../../_components/person/person.component';
import { VideoComponent } from '../../_components/video/video.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { FilterSeach } from 'src/app/_type/filters/filter';
import { UserService } from 'src/app/_service/models/user.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import { environment } from 'src/app/environments/environment';
import { PostService } from 'src/app/_service/models/post.service';
import { Post } from 'src/app/_type/models/post';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MaterialModule,
    MatTabsModule,
    NgFor,
    NgIf,
    MastheadComponent,
    PostComponent,
    StoryComponent,
    ReelComponent,
    HttpClientModule,
    PlaceComponent,
    PersonComponent,
    VideoComponent,
  ],
  providers: [UserService, PostService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  userDTO?: UserDTO;
  post!: Post[];
  
  indexPost = 0;
  indexRee = 0;
  indexShare = 0;
  indexTag = 0;

  number = 10;

  elemnts: string[] = ['settings', 'qr_code', 'logout'];
  filters: FilterSeach[] = [
    {
      value: '1',
      icon: 'person',
      name: 'Fallowing',
    },
    {
      value: '1',
      icon: 'person',
      name: 'Fallowing',
    },
  ];

  isPhoto!: boolean;
  isFollowrs!: boolean;
  isFollowing!: boolean;

  items = Array(10);

  constructor(private dialog: DialogService, private userService: UserService, private postService: PostService) {
    this.isPhoto = true;

    userService.findUserByName(environment.user).subscribe({
      next: (data) => {
        this.userDTO = data;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.postService.getPostByProfile(environment.user, PostEnum.POST, this.indexPost, this.number).subscribe({
      next: (data: Post[]) => {
        // console.log(data);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  onOpenPhote() {
    this.dialog.openDialogPhote(this.userDTO?.user?.profile_picture as string);
  }

  onIsPhoto() {
    this.isPhoto = true;
    this.isFollowrs = false;
    this.isFollowing = false;
  }

  onIsFollowrs() {
    this.isPhoto = false;
    this.isFollowrs = true;
    this.isFollowing = false;
  }

  onIsFollowing() {
    this.isPhoto = false;
    this.isFollowrs = false;
    this.isFollowing = true;
  }

  onTabChange(event: any) {
    const selectedTabIndex = event.index;
    // console.log(selectedTabIndex);
  }
}
