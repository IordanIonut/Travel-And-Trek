import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MessageReadStatus } from 'src/app/_type/models/message-read-status';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { TimeComponent } from '../time/time.component';
import { StoryComponent } from '../story/story.component';

@Component({
  selector: 'app-message-chat',
  standalone: true,
  imports: [MaterialModule, NgClass, NgIf, CommonModule, TimeComponent, StoryComponent],
  providers: [DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageChatComponent implements OnInit {
  @Input() chat!: MessageReadStatus;
  @Input() position!: string;
  @Input() prv!: MessageReadStatus | null;
  time!: boolean;

  ngOnInit(): void {
    if (
      this.prv?.message_id?.created_at &&
      this.prv?.message_id?.updated_at &&
      this.chat?.message_id?.created_at &&
      this.chat?.message_id?.updated_at
    ) {
      const previousDate =
        new Date(this.prv.message_id.created_at) >
        new Date(this.prv.message_id.updated_at)
          ? new Date(this.prv.message_id.created_at)
          : new Date(this.prv.message_id.updated_at);
      const currentDate =
        new Date(this.chat.message_id.created_at) >
        new Date(this.chat.message_id.updated_at)
          ? new Date(this.chat.message_id.created_at)
          : new Date(this.chat.message_id.updated_at);
      this.time = previousDate.getTime() !== currentDate.getTime();
    } else {
      this.time = false;
    }
  }

  validatePosition(position: string): string {
    return position === 'left' || position === 'right' ? position : 'left';
  }
}
