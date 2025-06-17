import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DialogService } from 'projects/app-dashbord/src/lib/_service/dialog/dialog.service';
import { CommentService } from 'projects/app-dashbord/src/lib/_service/models/comment.service';
import {
  Comment,
  MaterialModule,
  ShadowService,
} from 'travel-and-trek-app-core/dist/app-core';
import { CommentId } from 'travel-and-trek-app-core/dist/app-core/lib/_model/_class/commet';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MaterialModule, HttpClientModule, NgIf, CommonModule, NgClass],
  providers: [DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() ischild: boolean = false;

  @Output() reloade = new EventEmitter<boolean>();

  @ViewChild('im', { static: false })
  im!: ElementRef<HTMLImageElement>;
  @ViewChild('con', { static: false })
  con!: ElementRef<HTMLImageElement>;

  constructor(
    private shadow: ShadowService,
    private dialogService: DialogService,
    private commentService: CommentService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    // if (this.im !== undefined && this.con !== undefined) {
    //   const imgElement = this.im!.nativeElement;
    //   const containerElement = this.con.nativeElement;
    //   imgElement.crossOrigin = 'anonymous';
    //   if (imgElement.complete) {
    //     this.shadow.applyShadowToContainer1(imgElement, containerElement);
    //   } else {
    //     imgElement.addEventListener('load', () => {
    //       this.shadow.applyShadowToContainer1(imgElement, containerElement);
    //     });
    //   }
    // }
  }

  onProperty(
    property: 'img' | 'name' | 'date' | 'text' | 'parent' | 'id'
  ): any {
    switch (property) {
      case 'img':
        return this.comment?.comment_user_id?.profile_picture;
      case 'name':
        return this.comment?.comment_user_id?.name;
      case 'date':
        return this.comment.create_at;
      case 'text':
        return this.comment.message;
      case 'parent':
        return this.comment.comment_source_id !== null;
      case 'id':
        return this.comment.id as CommentId;
      default:
        return undefined;
    }
  }

  protected onComment(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const buttonPosition: Position = {
      pos_x: rect.x + 350,
      pos_y: rect.y + 30,
    };
    this.dialogService
      .openDialogSend(
        buttonPosition,
        this.comment.comment_post_id?.id!,
        true,
        this.comment.id
      )
      .subscribe((result: boolean) => {
        if (result) {
          this.reloade.emit(true);
        }
      });
  }

  protected onLike(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const buttonPosition: Position = {
      pos_x: rect.x + 350,
      pos_y: rect.y + 30,
    };
    this.dialogService.openDialogSeeValue(
      buttonPosition,
      this.onProperty('id')!,
      'LIKE',
      false
    );
  }
}
