import { Injectable } from '@angular/core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Post } from 'travel-and-trek-app-core/dist/app-core';
import { TranslateDialogComponent } from '../../_components/_dialog/translate-dialog/translate-dialog.component';
import { NsfwDialogComponent } from '../../_components/_dialog/nsfw-dialog/nsfw-dialog.component';
import { PreviewPostComponent } from '../../_components/_dialog/preview-post/preview-post.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef: any;
  constructor(private _dialog: MatDialog) {}

  openTranslateDialog(
    message: string
  ): Observable<{ text: string; error: boolean }> {
    const dialogRef = this._dialog.open(TranslateDialogComponent, {
      data: { message: message },
    });
    return dialogRef.beforeClosed() as Observable<{
      text: string;
      error: boolean;
    }>;
  }

  openNSFWDialog(image: string, obj: any) {
    this._dialog.open(NsfwDialogComponent, {
      data: { image: image, obj: obj },
    });
  }

  openPreviewPostDialog(data: Post): any {
    const dialogRef = this._dialog.open(PreviewPostComponent, {
      width: '50rem',
      minWidth: '50rem',
      maxHeight: '98vh',
      maxWidth: 'max-content',
      height: 'auto',
      data: { data: data },
    });
    dialogRef.afterClosed().subscribe(() => {});
    return dialogRef.afterClosed();
  }
}
