import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  AlertComponent,
  Environment,
  Mode,
} from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-nsfw-dialog',
  imports: [],
  templateUrl: './nsfw-dialog.component.html',
  styleUrl: './nsfw-dialog.component.scss',
})
export class NsfwDialogComponent {
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('image', { static: false }) image!: ElementRef<HTMLImageElement>;
  private ctx!: CanvasRenderingContext2D;
  boxes!: { box: number[]; label: string; score: number }[];
  imageUrl!: string;

  constructor(
    private _dialogRef: MatDialogRef<NsfwDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { image: string; obj: any }
  ) {
    this.boxes = data.obj;
    this.imageUrl = data.image;
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.ctx = this.canvas.nativeElement.getContext('2d')!;
      this.drawBoxes();
      setTimeout(() => {
        this._dialogRef.close();
      }, Environment.duration);
    }
  }

  drawBoxes() {
    for (const item of this.boxes) {
      const [x1, y1, x2, y2] = item.box;
      const img = this.image.nativeElement;

      const scaleX = img.width / this.image.nativeElement.naturalWidth;
      const scaleY = img.height / this.image.nativeElement.naturalHeight;

      const scaledX1 = x1 * scaleX;
      const scaledY1 = y1 * scaleY;
      const scaledX2 = x2 * scaleX;
      const scaledY2 = y2 * scaleY;

      const color: string = this.getRandomColor();

      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 2;
      this.ctx.strokeRect(
        scaledX1,
        scaledY1,
        scaledX2 - scaledX1,
        scaledY2 - scaledY1
      );

      const text = `${item.label}: ${item.score.toFixed(2)}`;
      this.ctx.font = '16px Arial';
      this.ctx.fillStyle = color;
      this.ctx.fillText(text, scaledX1, scaledY1 - 10);
    }
  }

  onImageLoad(): void {
    const img = this.image.nativeElement;
    const canvasEl = this.canvas.nativeElement;

    canvasEl.width = img.width;
    canvasEl.height = img.height;

    this.ctx = canvasEl.getContext('2d')!;
    this.drawBoxes();
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
