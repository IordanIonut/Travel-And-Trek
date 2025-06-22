import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Comment,
  CommentEnum,
  CommentId,
  CommentService,
  iconsObject,
  JwtService,
  MaterialModule,
  Post,
  PostId,
  User,
} from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-send',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, HttpClientModule],
  providers: [],
  templateUrl: './send.component.html',
  styleUrl: './send.component.scss',
})
export class SendComponent {
  postId!: PostId;
  commentId!: CommentId;
  parent!: boolean;
  form!: FormGroup;

  iconsObjectNow = iconsObject;

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private _jwtService: JwtService,
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
          id: '',
          name: this._jwtService.getUserInfo()!.name!,
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
