import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { Highlight } from 'src/app/_type/models/highlight';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [NgFor, MaterialModule],
  providers: [DialogService],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss',
})
export class StoryComponent {
  @Input() highlight!: Highlight[];

  @ViewChildren('img') images!: QueryList<ElementRef>;
  @ViewChildren('con') buttons!: QueryList<ElementRef>;

  constructor(private dialog: DialogService, private shadow: ShadowService) {}

  ngOnInit(): void {
    // console.log(this.highlight);
    // console.log(this.currentLine);
  }

  ngAfterViewInit(): void {
    this.images?.forEach((imageRef, index) => {
      const image = imageRef.nativeElement;
      const content = this.buttons.toArray()[index].nativeElement;
      image.crossOrigin = 'anonymous';
      if (image.complete) {
        this.shadow.applyShadowStory(image, content);
      } else {
        image.addEventListener('load', () => {
          this.shadow.applyShadowStory(image, content);
        });
      }
    });
  }

  openDiaglog(position: number) {
    this.dialog.openDialogHighlight(this.highlight, position);
  }
}
