import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from 'projects/app-dashbord/src/lib/_dialogs/chat/chat.component';
import { CommentsComponent } from 'projects/app-dashbord/src/lib/_dialogs/comments/comments.component';
import { FilterComponent } from 'projects/app-dashbord/src/lib/_dialogs/filter/filter.component';
import { HighlightComponent } from 'projects/app-dashbord/src/lib/_dialogs/highlight/highlight.component';
import { LikesComponent } from 'projects/app-dashbord/src/lib/_dialogs/likes/likes.component';
import { NotificationComponent } from 'projects/app-dashbord/src/lib/_dialogs/notification/notification.component';
import { PhotoComponent } from 'projects/app-dashbord/src/lib/_dialogs/photo/photo.component';
import { PostComponent } from 'projects/app-dashbord/src/lib/_dialogs/post/post.component';
import { ProfileComponent } from 'projects/app-dashbord/src/lib/_dialogs/profile/profile.component';
import { QrCodeComponent } from 'projects/app-dashbord/src/lib/_dialogs/qr-code/qr-code.component';
import { SeeValueComponent } from 'projects/app-dashbord/src/lib/_dialogs/see-value/see-value.component';
import { SendComponent } from 'projects/app-dashbord/src/lib/_dialogs/send/send.component';
import { SharesComponent } from 'projects/app-dashbord/src/lib/_dialogs/shares/shares.component';
import {
  CommentId,
  FilterSeach,
  Highlight,
  Post,
  PostId,
  Share,
  Story,
} from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  width = 400;
  height = 33;
  maxHeight: string = '98vh';
  maxWidth: string = 'max-content';
  private dialogRef: any;
  constructor(private dialog: MatDialog) {}

  openDialogChat(position: Position): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: `${this.width}px`,
      height: `${this.height}rem`,
      data: { message: 'Hello, this is a dialog!' },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogNotification(position: Position): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: `${this.width}px`,
      height: `${this.height}rem`,
      data: { message: 'Hello, this is a dialog!' },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogProfile(position: Position, name: string, type: string): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: `${this.width}px`,
      data: { name: name, type: type },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogPhote(image: string): void {
    const dialogRef = this.dialog.open(PhotoComponent, {
      width: 'auto',
      height: 'auto',
      data: { image },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogHighlightOrStory(
    highlight: Highlight[] | Story[],
    position: number
  ): void {
    const dialogRef = this.dialog.open(HighlightComponent, {
      width: 'auto',
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      height: 'auto',
      data: { data: highlight, index: position },
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogFilter(
    data: FilterSeach[],
    position: Position,
    callback: (selectedValue: FilterSeach) => void
  ): void {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: `${this.width}px`,
      height: 'auto',
      data: { data: data },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x}px`,
      },
    });
    dialogRef.componentInstance?.selectionChanged.subscribe(
      (selectedValue: FilterSeach) => {
        callback(selectedValue);
      }
    );

    // dialogRef.afterClosed().subscribe((result: FilterSeach) => {
    //   callback(result);
    // });
  }

  openDialogSeeValue(
    position: Position,
    id: PostId | CommentId,
    type: 'LIKE' | 'SHARE' | 'COMMENT',
    isComment: boolean
  ) {
    const dialogRef = this.dialog.open(SeeValueComponent, {
      width: '5px',
      height: '5px',
      minWidth: 'fit-content',
      data: { id: id, type: type, isComment },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogLikes(position: Position, id: PostId) {
    const dialogRef = this.dialog.open(LikesComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: id },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogShares(position: Position, id: PostId) {
    const dialogRef = this.dialog.open(SharesComponent, {
      width: 'auto',
      height: 'auto',
      data: { id: id },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogComponents(position: Position, id: PostId) {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: 'auto',
      minWidth: '50rem',
      height: 'auto',
      data: { id: id },
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    dialogRef.afterClosed().subscribe(() => {});
  }

  openDialogSend(
    position: Position,
    postId: PostId,
    parent: boolean,
    commentId?: CommentId
  ): any {
    const dialogRef = this.dialog.open(SendComponent, {
      width: 'auto',
      minWidth: 'auto',
      height: 'auto',
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      data: { postId: postId, commentId: commentId, parent: parent },
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    return dialogRef.afterClosed();
  }

  openDialogPost(data: Post | Share): any {
    const dialogRef = this.dialog.open(PostComponent, {
      width: '50rem',
      minWidth: '50rem',
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      height: 'auto',
      data: { data: data },
    });
    dialogRef.afterClosed().subscribe(() => {});
    return dialogRef.afterClosed();
  }

  openDialogQrCode(type: 'user' | 'group', name: string): any {
    const dialogRef = this.dialog.open(QrCodeComponent, {
      width: 'auto',
      minWidth: 'auto',
      height: 'auto',
      maxHeight: this.maxHeight,
      maxWidth: this.maxWidth,
      data: { type: type, name: name },
    });
    dialogRef.afterClosed().subscribe(() => {});
    return dialogRef.afterClosed();
  }
}
