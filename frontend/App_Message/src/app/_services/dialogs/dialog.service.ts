import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HighlightComponent } from 'src/app/_dialogs/highlight/highlight.component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  width = 400;
  height = 33;
  constructor(private dialog: MatDialog) {}

  openDialogHighlight(highlight: Highlight[], position: number): void {
    const dialogRef = this.dialog.open(HighlightComponent, {
      width: 'auto',
      height: 'auto',
      data: { data: highlight, index: position },
    });
    dialogRef.afterClosed().subscribe();
  }
}
