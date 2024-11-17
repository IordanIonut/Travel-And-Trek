import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from 'src/app/_dialogs/chat/chat.component';
import { HighlightComponent } from 'src/app/_dialogs/highlight/highlight.component';
import { NotificationComponent } from 'src/app/_dialogs/notification/notification.component';
import { PhotoComponent } from 'src/app/_dialogs/photo/photo.component';
import { ProfileComponent } from 'src/app/_dialogs/profile/profile.component';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';


@Injectable({
  providedIn: 'root',
})
export class DialogService {
  width = 400;
  height = 33;
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

  openDialogProfile(position: Position): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: `${this.width}px`,
      data: { message: 'Hello, this is a dialog!' },
      position: {
        top: `${position.pos_y}px`,
        left: `${position.pos_x - this.width}px`,
      },
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogPhote(image: string):void{
    const dialogRef = this.dialog.open(PhotoComponent, {
      width: 'auto',
      height: 'auto',
      data: { image },
    });
    dialogRef.afterClosed().subscribe();
  }

  openDialogHighlight():void{
    const dialogRef = this.dialog.open(HighlightComponent, {
      width: 'auto',
      height: 'auto',
      data: { },
    });
    dialogRef.afterClosed().subscribe();
  }
}
