import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../_dialogs/chat/chat.component';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';
import { NotificationComponent } from '../_dialogs/notification/notification.component';
import { ProfileComponent } from '../_dialogs/profile/profile.component';

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
}
