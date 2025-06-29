import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DialogService } from '../../_service/dialog/dialog.service';
import {
  Highlight,
  JwtService,
  MaterialModule,
  ShadowService,
  SkeletonService,
  Story,
  ValidationModelService,
} from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  providers: [DialogService],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent {
  @Input() highlight: Story[] | Highlight[] = [];
  @Input() user!: string;

  @ViewChildren('imgStory') images!: QueryList<ElementRef>;
  @ViewChildren('conStory') buttons!: QueryList<ElementRef>;

  constructor(
    private dialog: DialogService,
    private shadow: ShadowService,
    private validationModelService: ValidationModelService,
    protected _skeletonService: SkeletonService,
    private _jwtService: JwtService
  ) {}

  ngAfterViewInit(): void {
    this.images.changes.subscribe(() => this.processElements());
    this.buttons.changes.subscribe(() => this.processElements());
    this.processElements();
  }

  protected processElements(): void {
    const imageElements = this.images.toArray();
    const buttonElements = this.buttons.toArray();

    imageElements!.forEach((imageRef, index) => {
      const image = imageRef.nativeElement;
      const content = buttonElements[index]?.nativeElement;
      image.crossOrigin = 'anonymous';
      if (image.complete) {
        this.shadow?.applyShadowStory(image, content);
      } else {
        image.addEventListener('load', () => {
          this.shadow?.applyShadowStory(image, content);
        });
      }
    });
  }

  protected openDiaglog(position: number) {
    this.dialog.openDialogHighlightOrStory(this.highlight, position);
  }

  protected getFilteredItems(): (Highlight | Story)[] {
    return this.highlight;
  }

  protected getProperty(
    property: 'image' | 'name',
    item: Highlight | Story
  ): string | undefined | null {
    if (this.validationModelService.isHighlight(item)) {
      switch (property) {
        case 'image': {
          return item.image;
        }
        case 'name': {
          return item.name;
        }
      }
    } else if (this.validationModelService.isStory(item)) {
      switch (property) {
        case 'image': {
          return item.story_user_id.profile_picture;
        }
        case 'name': {
          return item.story_user_id.name;
        }
      }
    }
    return undefined;
  }

  onIsTheSamePerson(): boolean {
    return this._jwtService.getUserInfo().name === this.user;
  }
}
