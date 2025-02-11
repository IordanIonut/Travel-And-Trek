import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import ColorThief from 'colorthief';
import { interval, Subscription, take } from 'rxjs';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { Highlight } from 'src/app/_type/models/highlight';
import { Media } from 'src/app/_type/models/media';
import { CdkDragMove, DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { HammerModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-highlight',
  standalone: true,
  imports: [
    MaterialModule,
    MatProgressBarModule,
    HammerModule,
    DragDropModule,
    NgFor,
  ],
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
})
export class HighlightComponent implements OnDestroy, AfterViewInit {
  colorThief: ColorThief = new ColorThief();
  progress!: number;
  remainingTime!: number;
  private subscription!: Subscription;
  startX = 0;
  currentIndex = 0;

  highlights!: Highlight[];
  index!: number;

  images!: Media[];

  get currentImage(): Media {
    return this.images[this.currentIndex];
  }

  constructor(
    private elementRef: ElementRef,
    private shadow: ShadowService,
    @Inject(MAT_DIALOG_DATA) public data: { data: Highlight[]; index: number }
  ) {
    this.highlights = data.data;
    this.index = data.index;

    this.onPostPosition(data.data[data.index]);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {}

  onImageLoad(img: HTMLImageElement): void {
    this.shadow.applyShadowDialog(img);
  }

  onPointerDown(event: PointerEvent): void {
    this.startX = event.clientX;
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.startX) return;
    const deltaX = event.clientX - this.startX;
    if (deltaX < -100) {
      this.onSwipeLeft();
      this.startX = 0;
    }
    if (deltaX > 100) {
      this.onSwipeRight();
      this.startX = 0;
    }
  }

  onSwipeLeft(): void {
    if (this.currentIndex + 1 < this.images?.length) {
      this.currentIndex++;
      this.onProgress();
      // console.log('Swiped left:', this.currentIndex);
    } else {
      if (this.index + 1 < this.highlights.length) {
        this.index++;
        this.onPostPosition(this.highlights[this.index]);
      } else {
        this.index = 0;
        this.onPostPosition(this.highlights[this.index]);
      }
    }
  }

  onSwipeRight(): void {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--;
      this.onProgress();
      // console.log('Swiped right:', this.currentIndex);
    } else {
      if (this.index - 1 >= 0) {
        this.index--;
        this.onPostPosition(this.highlights[this.index]);
      } else {
        this.index = this.highlights.length - 1;
        this.onPostPosition(this.highlights[this.index]);
      }
    }
  }

  onPostPosition(highlight: Highlight) {
    this.currentIndex = 0;
    this.images = highlight.highlight_medias;
    // console.log('New highlight set, images:', this.images);
    this.onProgress();
  }

  onProgress() {
    const totalDuration = 15;
    const tickInterval = 1000;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.remainingTime = totalDuration;
    this.progress = 0;

    this.subscription = interval(tickInterval)
      .pipe(take(totalDuration))
      .subscribe((elapsedSeconds) => {
        this.remainingTime = totalDuration - elapsedSeconds - 1;
        this.progress = ((elapsedSeconds + 1) / totalDuration) * 100;
        if (elapsedSeconds + 1 === totalDuration) {
          this.onSwipeLeft();
        }
      });
  }
}
