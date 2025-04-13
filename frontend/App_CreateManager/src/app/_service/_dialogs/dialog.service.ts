import { Injectable } from '@angular/core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';
import { MatDialog } from '@angular/material/dialog';
import { TranslateDialogComponent } from 'src/app/_components/_dialog/translate-dialog/translate-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef: any;
  constructor(private _dialog: MatDialog) {}

  openTranslateDialog(message: string): void {
    const dialogRef = this._dialog.open(TranslateDialogComponent, {
      data: { message: message },
    });
    dialogRef.afterClosed().subscribe();
  }
}
