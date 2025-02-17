import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'console';
import { UserComponent } from 'src/app/_components/user/user.component';
import { ShareService } from 'src/app/_service/models/share.service';
import { UserDTO } from 'src/app/_type/dto/user.dto';
import { PostId } from 'src/app/_type/models/post';
import { environment } from 'src/app/environments/environment';

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
    private shareService: ShareService,
    @Inject(MAT_DIALOG_DATA) data: { id: PostId }
  ) {
    this.id = data.id;
  }

  ngOnInit() {
    this.shareService
      .findUsersLikesByPost(environment.user.name, this.id.id, this.id.type)
      .subscribe({
        next: (data: UserDTO[]) => {
          this.data = [...data];
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
  }
}
