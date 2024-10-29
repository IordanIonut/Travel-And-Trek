import { NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { PostComponent } from '../../_components/post/post.component';
import { StoryComponent } from '../../_components/story/story.component';
import { ReelComponent } from '../reel/reel.component';
import { PlaceComponent } from '../../_components/place/place.component';
import { PersonComponent } from '../../_components/person/person.component';
import { VideoComponent } from '../../_components/video/video.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { FilterSeach } from 'src/app/_type/filter';

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
    PlaceComponent,
    PersonComponent,
    VideoComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  elemnts: string[] = ['settings', 'qr_code', 'logout'];
  filters: FilterSeach[] = [
    {
      value: '1',
      icon: 'person',
      name: "Fallowing"
    },
    {
      value: '1',
      icon: 'person',
      name: "Fallowing"
    }
  ];
  
  isPhoto!: boolean;
  isFollowrs!: boolean;
  isFollowing!: boolean;

  items = Array(10);

  constructor(private dialog: DialogService){
    this.isPhoto = true;
  };

  onOpenPhote(){
    this.dialog.openDialogPhote();
  }

  onIsPhoto(){
    this.isPhoto = true;
    this.isFollowrs = false;
    this.isFollowing = false;
  }

  onIsFollowrs(){
    this.isPhoto = false;
    this.isFollowrs = true;
    this.isFollowing = false;
  }

  onIsFollowing(){
    this.isPhoto = false;
    this.isFollowrs = false;
    this.isFollowing = true;
  }
}
