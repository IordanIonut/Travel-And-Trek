import { Portal } from '@angular/cdk/portal';
import { NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { ValidationModelService } from 'src/app/_service/validator/validation-model.service';
import { Highlight } from 'src/app/_type/models/highlight';
import { Story } from 'src/app/_type/models/story';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [NgFor, MaterialModule, NgIf],
  providers: [DialogService],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent {
  @Input() highlight: Highlight[] | Story[] = [];

  @ViewChildren('imgStory') images!: QueryList<ElementRef>;
  @ViewChildren('conStory') buttons!: QueryList<ElementRef>;

  constructor(
    private dialog: DialogService,
    private shadow: ShadowService,
    private validationModelService: ValidationModelService
  ) {}

  ngOnInit(): void {}

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
}
