import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { error } from 'console';
import { CommentService } from 'src/app/_service/models/comment.service';
import { LikeService } from 'src/app/_service/models/like.service';
import { ShareService } from 'src/app/_service/models/share.service';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { Post, PostId } from 'src/app/_type/models/post';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MatDividerModule } from '@angular/material/divider';
import { NgClass, NgIf, NgStyle } from '@angular/common';
import { iconsObject } from 'src/app/_type/icon/icon';
import { LikeEnum } from 'src/app/_type/enum/like.enum';
import { LikeContentEnum } from 'src/app/_type/enum/like.content.enum';
import { Like } from 'src/app/_type/models/like';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/_type/models/user';
import { LikeDTO } from 'src/app/_type/dto/like.dto';
import { Comment, CommentId } from 'src/app/_type/models/commet';
import { ValidationModelService } from 'src/app/_service/validator/validation-model.service';
import { CommentEnum } from 'src/app/_type/enum/comment.enum';

@Component({
  selector: 'app-see-value',
  standalone: true,
  imports: [
    MaterialModule,
    HttpClientModule,
    MatDividerModule,
    NgIf,
    NgStyle,
    NgClass,
  ],
  providers: [
    LikeService,
    ShareService,
    CommentService,
    ValidationModelService,
  ],
  templateUrl: './see-value.component.html',
  styleUrl: './see-value.component.scss',
})
export class SeeValueComponent {
  type!: string;
  id!: PostId | CommentId;
  isComment!: boolean;

  iconsObject = iconsObject;
  LikeContentEnum = LikeContentEnum;
  count!: number;
  selectedIcon!: string;

  constructor(
    private likeService: LikeService,
    private shareService: ShareService,
    private commentService: CommentService,
    private validation: ValidationModelService,
    @Inject(MAT_DIALOG_DATA)
    data: { id: PostId; type: 'LIKE' | 'SHARE' | 'COMMENT'; isComment: boolean }
  ) {
    this.type = data.type;
    this.id = data.id;
    this.isComment = data.isComment;
  }

  onReactPost(like: LikeContentEnum, is: boolean) {
    const likeOBJ: Like = {
      id: {
        id: '',
        type: LikeEnum.POST,
        content: like,
      },
      like_user_id: {
        id: environment.user.id,
      } as User,
      like_media_id: null,
      like_post_id: is
        ? ({
            id: {
              id: this.id.id,
              type: this.id.type,
            },
          } as Post)
        : null,
      like_comment_id: !is
        ? ({
            id: {
              id: this.id.id,
              type: this.id.type,
            },
          } as Comment)
        : null,
      create_at: new Date(),
    };

    this.likeService.postLike(likeOBJ).subscribe({
      next: () => {
        this.ngAfterContentInit();
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  private onProperty(
    property: 'value' | 'type'
  ): PostEnum | CommentEnum | 'POST' | 'COMMENT' | undefined {
    if (this.validation.isPostIdOrCommentId(this.id)) {
      switch (property) {
        case 'value':
          return this.id.type as PostEnum;
        case 'type':
          return 'POST';
      }
    } else if (this.validation.isCommentIdOrPostId(this.id)) {
      switch (property) {
        case 'value':
          return this.id.type as CommentEnum;
        case 'type':
          return 'COMMENT';
      }
    }
    return undefined;
  }

  ngAfterContentInit(): void {
    switch (this.type) {
      case 'LIKE': {
        this.likeService
          .findCountLikesByPost(
            this.id.id,
            this.onProperty('value')! as PostEnum | CommentEnum,
            this.isComment ? 'POST' : 'COMMENT'
          )
          .subscribe({
            next: (data: LikeDTO) => {
              this.count = data.count;
              this.selectedIcon = data.content;
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
        break;
      }
      case 'SHARE': {
        this.shareService
          .findCountSharesByPost(
            this.id.id,
            this.onProperty('value')! as PostEnum | CommentEnum
          )
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
          .findCountCommentsByPost(
            this.id.id,
            this.onProperty('value')! as PostEnum | CommentEnum
          )
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
    return (value ?? 0) + '';
  }
}
