import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from 'src/app/_dialogs/chat/chat.component';
import { FilterComponent } from 'src/app/_dialogs/filter/filter.component';
import { HighlightComponent } from 'src/app/_dialogs/highlight/highlight.component';
import { NotificationComponent } from 'src/app/_dialogs/notification/notification.component';
import { PhotoComponent } from 'src/app/_dialogs/photo/photo.component';
import { ProfileComponent } from 'src/app/_dialogs/profile/profile.component';
import { FilterSeach } from 'src/app/_type/filters/filter';
import { Highlight } from 'src/app/_type/models/highlight';
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
}
