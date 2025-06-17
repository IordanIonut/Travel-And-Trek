import { NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MaterialModule, NgFor],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent {
  items = Array(19);
}
