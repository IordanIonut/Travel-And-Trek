import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'console';
import { CommentService } from 'src/app/_service/models/comment.service';
import { LikeService } from 'src/app/_service/models/like.service';
import { ShareService } from 'src/app/_service/models/share.service';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { PostId } from 'src/app/_type/models/post';

@Component({
  selector: 'app-see-value',
  standalone: true,
  imports: [HttpClientModule],
  providers: [LikeService, ShareService, CommentService],
  templateUrl: './see-value.component.html',
  styleUrl: './see-value.component.scss',
})
export class SeeValueComponent {
  type!: string;
  id!: PostId;

  count!: number;
  constructor(
    private likeService: LikeService,
    private shareService: ShareService,
    private commentService: CommentService,
    @Inject(MAT_DIALOG_DATA)
    data: { id: PostId; type: 'LIKE' | 'SHARE' | 'COMMENT' }
  ) {
    this.type = data.type;
    this.id = data.id;
  }

  ngAfterContentInit(): void {
    switch (this.type) {
      case 'LIKE': {
        this.likeService
          .findCountLikesByPost(this.id.id, this.id.type)
          .subscribe({
            next: (data: number) => {
              this.count = data;
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
      case 'SHARE': {
        this.shareService
          .findCountSharesByPost(this.id.id, this.id.type)
          .subscribe({
            next: (data: number) => {
              this.count = data;
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
      case 'COMMENT': {
        this.commentService
          .findCountCommentsByPost(this.id.id, this.id.type)
          .subscribe({
            next: (data: number) => {
              this.count = data;
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
    }
  }

  protected formatNumber(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return value + '';
  }
}
