import { NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [MaterialModule, NgFor],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent {
  items = Array(19);
}
