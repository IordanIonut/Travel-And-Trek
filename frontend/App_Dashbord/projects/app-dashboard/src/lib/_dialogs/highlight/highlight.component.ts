import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { interval, Subscription, take } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  Highlight,
  Icon,
  iconsObject,
  JwtService,
  MaterialModule,
  Media,
  ShadowService,
  Story,
} from 'travel-and-trek-app-core/dist/app-core';
import { HammerModule } from '@angular/platform-browser';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgFor, NgIf } from '@angular/common';
import { ValidationModelService } from 'projects/app-dashboard/src/lib/_service/validator/validation-model.service';

@Component({
  selector: 'app-highlight',
  standalone: true,
  imports: [
    MaterialModule,
    MatProgressBarModule,
    HammerModule,
    DragDropModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss'],
})
export class HighlightComponent implements OnDestroy, AfterViewInit {
  progress!: number;
  remainingTime!: number;
  private subscription!: Subscription;
  startX = 0;
  currentIndex = 0;
  iconsObjectNow: Record<string, Icon> = iconsObject;
  highlights!: Highlight[] | Story[];
  index!: number;
  profile!: string;
  images!: Media[];
  totalDuration!: number;

  @ViewChild('dynamicVideo') videoRef!: ElementRef<HTMLVideoElement>;

  get currentImage(): Media {
    return this.images[this.currentIndex];
  }

  constructor(
    private shadow: ShadowService,
    private validatorModelService: ValidationModelService,
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

  onImageLoad(img: any): void {
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

  onPostPosition(highlight: Highlight | Story) {
    this.currentIndex = 0;
    if (this.validatorModelService.isHighlight(highlight)) {
      this.images = [];
      this.images = [...highlight.highlight_medias];
      this.profile = highlight.image;
    } else if (this.validatorModelService.isStory(highlight)) {
      this.images = [];
      this.images = [...highlight.story_medias];
      this.profile = highlight.story_user_id?.profile_picture;
    }
    this.onProgress();
  }

  onVideoMetadataLoaded(video: HTMLVideoElement): number {
    this.totalDuration = video.duration;
    return video.duration;
  }

  onProgress() {
    const tickInterval = 1000;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = interval(tickInterval)
      .pipe(take(this.totalDuration))
      .subscribe((elapsedSeconds) => {
        this.remainingTime = this.totalDuration - elapsedSeconds - 1;
        this.progress = ((elapsedSeconds + 1) / this.totalDuration) * 100;
        if (elapsedSeconds + 1 === this.totalDuration) {
          this.onSwipeLeft();
        }
      });
  }

  getFileType(url: string): 'image' | 'video' | 'unknown' {
    const extension = url.split('.').pop()?.toLowerCase();
    if (!extension) return 'unknown';

    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', '600'];
    const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv'];

    if (
      imageExtensions.includes(extension) ||
      extension.includes('photos/seed/')
    ) {
      this.totalDuration = 15;
      return 'image';
    }
    if (videoExtensions.includes(extension)) {
      return 'video';
    }
    return 'unknown';
  }
}
