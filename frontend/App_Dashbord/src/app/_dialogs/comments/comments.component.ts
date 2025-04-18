import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentComponent } from 'src/app/_components/comment/comment.component';
import { CommentService } from 'src/app/_service/models/comment.service';
import {
  Comment,
  MaterialModule,
  PostId,
} from 'travel-and-trek-app-core/dist/app-core';
import { NgFor } from '@angular/common';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import {
  setLoadingOnRequest,
  SkeletonService,
} from 'src/app/_service/common/skeleton.service';
import { LikesComponent } from '../likes/likes.component';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [
    MaterialModule,
    HttpClientModule,
    DragDropModule,
    CommentComponent,
    NgFor,
  ],
  providers: [CommentService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  id!: PostId;
  comments!: Comment[];

  constructor(
    private _dialogRef: MatDialogRef<CommentsComponent>,
    private commnetService: CommentService,
    private dialogService: DialogService,
    protected _skeletonService: SkeletonService,
    @Inject(MAT_DIALOG_DATA) data: { id: PostId }
  ) {
    this.id = data.id;
    this.onfetchData();
  }

  ngOnInit(): void {}

  onReloade(event: any) {
    this.onfetchData();
  }

  private onfetchData() {
    this.commnetService
      .findCommentsByPost(this.id.id, this.id.type)
      .pipe(setLoadingOnRequest(this._skeletonService))
      .subscribe({
        next: (data: Comment[]) => {
          if (data.length === 0) {
            this._dialogRef.close();
          }
          this.comments = data;
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
  }

  protected onComment(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const buttonPosition: Position = {
      pos_x: rect.x + 350,
      pos_y: rect.y - 330,
    };
    this.dialogService
      .openDialogSend(buttonPosition, this.id, false)
      .subscribe((result: boolean) => {
        if (result) {
          this.onfetchData();
        }
      });
  }
}
