import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Position } from 'travel-and-trek-app-core/projects/app-core/src/lib/_types/_frontend/position';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { DialogService } from 'src/app/_service/dialog/dialog.service';

@Component({
  selector: 'app-masthead',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './masthead.component.html',
  styleUrl: './masthead.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MastheadComponent {
  buttonPosition!: Position;
  @ViewChild('masthead') masthead!: ElementRef;

  constructor(private dialog: DialogService) {
  }

  protected onOpenChat(event: MouseEvent) {
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const divHeight = this.masthead.nativeElement.clientHeight;

    this.buttonPosition = {
      pos_x: rect.x,
      pos_y: divHeight,
    };

    this.dialog.openDialogChat(this.buttonPosition);
  }

  protected onOpenNotification(event: MouseEvent){
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const divHeight = this.masthead.nativeElement.clientHeight;

    this.buttonPosition = {
      pos_x: rect.x,
      pos_y: divHeight,
    };

    this.dialog.openDialogNotification(this.buttonPosition);
  }

  protected onOpenProfile(event: MouseEvent){
    const buttonElement = event.target as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    const divHeight = this.masthead.nativeElement.clientHeight;

    this.buttonPosition = {
      pos_x: rect.x,
      pos_y: divHeight,
    };

    this.dialog.openDialogProfile(this.buttonPosition);
  }
}
