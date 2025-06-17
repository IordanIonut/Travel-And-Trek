import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserComponent } from 'projects/app-dashbord/src/lib/_components/user/user.component';
import {
  setLoadingOnRequest,
  SkeletonService,
} from 'projects/app-dashbord/src/lib/_service/common/skeleton.service';
import { ShareService } from 'projects/app-dashbord/src/lib/_service/models/share.service';
import {
  JwtService,
  PostId,
  UserDTO,
} from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-shares',
  standalone: true,
  imports: [UserComponent, HttpClientModule, NgFor],
  providers: [ShareService],
  templateUrl: './shares.component.html',
  styleUrl: './shares.component.scss',
})
export class SharesComponent {
  id!: PostId;
  data!: UserDTO[];
  constructor(
    private _dialogRef: MatDialogRef<SharesComponent>,
    private shareService: ShareService,
    private _jwtService: JwtService,
    private _skeletonService: SkeletonService,
    @Inject(MAT_DIALOG_DATA) data: { id: PostId }
  ) {
    this.id = data.id;
  }

  ngOnInit() {
    this.shareService
      .findUsersLikesByPost(
        this._jwtService.getUserInfo()!.name!,
        this.id.id,
        this.id.type
      )
      .pipe(setLoadingOnRequest(this._skeletonService))
      .subscribe({
        next: (data: UserDTO[]) => {
          if (data.length === 0) {
            this._dialogRef.close();
          }
          this.data = [...data];
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
  }
}
