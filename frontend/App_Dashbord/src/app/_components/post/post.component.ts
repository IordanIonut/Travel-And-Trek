import { NgFor, NgIf, NgStyle } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import ColorThief from 'colorthief';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { PostEnum } from 'src/app/_type/enum/post.enum';
import { Post } from 'src/app/_type/models/post';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf, NgStyle],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  @Input() post!: Post;

  buttonPosition!: Position;
  @ViewChild('postElement') postElement!: ElementRef;
  colorThief: ColorThief = new ColorThief();
  @ViewChild('postImage', { static: false })
  postImage!: ElementRef<HTMLImageElement>;
  @ViewChild('postContainer', { static: false })
  postContainer!: ElementRef<HTMLDivElement>;

  PostEnum = PostEnum;

  constructor(
    private dialogService: DialogService,
    private shadow: ShadowService,
    private elementRef: ElementRef
  ) {
    // console.log(this.post)
  }

  ngAfterViewInit(): void {
    if(this.postImage !== undefined && this.postImage !== undefined){
    const imgElement = this.postImage.nativeElement;
    const containerElement = this.postContainer.nativeElement;
      if (imgElement.complete) {
        this.shadow.applyShadowToContainer(imgElement, containerElement);
      } else {
        imgElement.addEventListener('load', () => {
          this.shadow.applyShadowToContainer(imgElement, containerElement);
        });
    }
    }
  }

  ngOnInit(): void {
    // console.log(this.post);
  }

  protected onOpenProfile(event: MouseEvent): void {
    const buttonElement = event.currentTarget as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    if (this.postElement !== undefined) {
      const divHeight = this.postElement.nativeElement.clientHeight;
      console.log(rect.x + " " + rect.y);
      this.buttonPosition = {
        pos_x: rect.x + 470,
        pos_y: rect.y - 290,
      };
      this.dialogService.openDialogProfile(this.buttonPosition);
    }
  }
}
