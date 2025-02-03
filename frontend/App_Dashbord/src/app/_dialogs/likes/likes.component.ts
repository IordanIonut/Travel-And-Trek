import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'console';
import { UserComponent } from 'src/app/_components/user/user.component';
import { LikeService } from 'src/app/_service/models/like.service';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import { LikeContentEnum } from 'src/app/_type/enum/like.content.enum';
import { PostId } from 'src/app/_type/models/post';
import { User } from 'src/app/_type/models/user';
import { environment } from 'src/app/environments/environment';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-likes',
  standalone: true,
  imports: [MaterialModule, HttpClientModule, UserComponent, NgFor],
  providers: [LikeService],
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss',
})
export class LikesComponent {
  id!: PostId;

  all!: UserDTO[];
  like!: UserDTO[];
  favorite!: UserDTO[];
  funny!: UserDTO[];

  constructor(
    private likeService: LikeService,
    @Inject(MAT_DIALOG_DATA) data: { id: PostId }
  ) {
    this.id = data.id;
  }

  ngAfterContentInit(): void {
    const index = 0;
    this.onTabChange({ index });
  }

  protected onTabChange(event: any) {
    const selectedTabIndex = event.index;
    switch (selectedTabIndex) {
      case 0: {
        this.likeService
          .findUsersLikesByPost(
            environment.user.name,
            this.id.id,
            this.id.type,
            null
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              this.all = [
                ...data,
                ...data,
                ...data,
                ...data,
                ...data,
                ...data,
                ...data,
              ];
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
      case 1: {
        this.likeService
          .findUsersLikesByPost(
            environment.user.name,
            this.id.id,
            this.id.type,
            LikeContentEnum.LIKE
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              this.like = [...data];
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
      case 2: {
        this.likeService
          .findUsersLikesByPost(
            environment.user.name,
            this.id.id,
            this.id.type,
            LikeContentEnum.LOVE
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              this.favorite = [...data];
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
      case 3: {
        this.likeService
          .findUsersLikesByPost(
            environment.user.name,
            this.id.id,
            this.id.type,
            LikeContentEnum.FUNNY
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              this.funny = [...data];
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
    }
  }

  protected generateIndexArray(index: number): number[] {
    return index !== 0 ? Array.from({ length: index }, (_, i) => i) : [0];
  }
}
