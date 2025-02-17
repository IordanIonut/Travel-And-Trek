import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { error } from 'console';
import { response } from 'express';
import { CommentService } from 'src/app/_service/models/comment.service';
import { CommentEnum } from 'src/app/_type/enum/comment.enum';
import { iconsObject } from 'src/app/_type/icon/icon';
import { Comment, CommentId } from 'src/app/_type/models/commet';
import { Post, PostId } from 'src/app/_type/models/post';
import { User } from 'src/app/_type/models/user';
import { environment } from 'src/app/environments/environment';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss',
})
export class SendComponent {
  postId!: PostId;
  commentId!: CommentId;
  parent!: boolean;
  form!: FormGroup;

  iconsObject = iconsObject;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private dialogRef: MatDialogRef<SendComponent>,
    @Inject(MAT_DIALOG_DATA)
    data: {
      postId: PostId;
      commentId: CommentId;
      parent: boolean;
    }
  ) {
    this.postId = data.postId;
    this.commentId = data.commentId;
    this.parent = data.parent;

    this.form = this.fb.group({
      message: [null, Validators.required],
    });
  }

  protected onSend() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const comment: Comment = {
        id: {
          id: '',
          type: CommentEnum.POST,
        },
        comment_user_id: {
          id: environment.user.id,
        } as User,
        comment_post_id: {
          id: {
            id: this.postId.id,
            type: this.postId.type,
          },
        } as Post,
        comment_media_id: null,
        comment_journal_id: null,
        message: this.form.value.message,
        create_at: new Date(),
        comment_source_id: {
          id: {
            id: this.parent ? this.commentId.id : null,
            type: this.parent ? this.commentId.type : null,
          },
        } as Comment,
      };

      this.commentService.postComment(comment).subscribe({
        next: (response) => {
          this.closeDialog();
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }
  }

  private closeDialog() {
    this.dialogRef.close(true);
  }
}
