import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MessageReadStatus } from 'src/app/_type/models/message-read-status';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  @Input() time!: MessageReadStatus;
}
