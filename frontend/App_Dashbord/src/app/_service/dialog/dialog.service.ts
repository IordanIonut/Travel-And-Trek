import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from 'src/app/_dialogs/chat/chat.component';
import { CommentsComponent } from 'src/app/_dialogs/comments/comments.component';
import { FilterComponent } from 'src/app/_dialogs/filter/filter.component';
import { HighlightComponent } from 'src/app/_dialogs/highlight/highlight.component';
import { LikesComponent } from 'src/app/_dialogs/likes/likes.component';
import { NotificationComponent } from 'src/app/_dialogs/notification/notification.component';
import { PhotoComponent } from 'src/app/_dialogs/photo/photo.component';
import { ProfileComponent } from 'src/app/_dialogs/profile/profile.component';
import { SeeValueComponent } from 'src/app/_dialogs/see-value/see-value.component';
import { SendComponent } from 'src/app/_dialogs/send/send.component';
import { SharesComponent } from 'src/app/_dialogs/shares/shares.component';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { FilterSeach } from 'src/app/_type/filters/filter';
import { CommentId } from 'src/app/_type/models/commet';
import { Highlight } from 'src/app/_type/models/highlight';
import { PostId } from 'src/app/_type/models/post';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  width = 400;
  height = 33;
  private dialogRef: any;
  constructor(private dialog: MatDialog) {}

  openDialogChat(position: Position): void {
    const dialogRef = this.dialog.open(ChatComponent, {
      width: `${this.width}px`,
      height: `${this.height}rem`,
      data: { message: 'Hello, this is a dialog!' },
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
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogHighlight(highlight: Highlight[], position: number): void {
    const dialogRef = this.dialog.open(HighlightComponent, {
      width: 'auto',
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
      data: { postId: postId, commentId: commentId, parent: parent },
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    return dialogRef.afterClosed();
  }
}
