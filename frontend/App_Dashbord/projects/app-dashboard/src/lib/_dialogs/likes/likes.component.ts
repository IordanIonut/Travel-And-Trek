import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserComponent } from '../../_components/user/user.component';
import {
  iconsObject,
  JwtService,
  LikeContentEnum,
  LikeService,
  MaterialModule,
  PostId,
  SkeletonService,
  UserDTO,
} from 'travel-and-trek-app-core/dist/app-core';

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
  iconsObjectNow = iconsObject;

  all!: UserDTO[];
  like!: UserDTO[];
  favorite!: UserDTO[];
  funny!: UserDTO[];

  constructor(
    private _dialogRef: MatDialogRef<LikesComponent>,
    private likeService: LikeService,
    private _jwtService: JwtService,
    private _skeletonService: SkeletonService,
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
            this._jwtService.getUserInfo()!.name!,
            this.id.id,
            this.id.type,
            null
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              if (data.length === 0) {
                this._dialogRef.close();
              }
              this.all = [...data];
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
            this._jwtService.getUserInfo()!.name!,
            this.id.id,
            this.id.type,
            LikeContentEnum.LIKE
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              if (data.length === 0) {
                this._dialogRef.close();
              }
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
            this._jwtService.getUserInfo()!.name!,
            this.id.id,
            this.id.type,
            LikeContentEnum.LOVE
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              if (data.length === 0) {
                this._dialogRef.close();
              }
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
            this._jwtService.getUserInfo()!.name!,
            this.id.id,
            this.id.type,
            LikeContentEnum.FUNNY
          )
          .subscribe({
            next: (data: UserDTO[]) => {
              if (data.length === 0) {
                this._dialogRef.close();
              }

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
