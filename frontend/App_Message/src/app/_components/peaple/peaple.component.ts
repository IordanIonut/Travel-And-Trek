import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ValidationModelService } from 'src/app/_services/validation/validation-model.service';
import { Message } from 'src/app/_type/models/message';
import { MessageReadStatus } from 'src/app/_type/models/message-read-status';
import { User } from 'src/app/_type/models/user';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-peaple',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  providers: [DatePipe, ValidationModelService],
  templateUrl: './peaple.component.html',
  styleUrl: './peaple.component.scss',
})
export class PeapleComponent {
  @Input() contact!: MessageReadStatus | User;
  @Input() index!: number;
  @Input() selected!: number;
  constructor(private validationModelService: ValidationModelService) {}

  protected getContactProperty(
    property: 'url' | 'name' | 'date' | 'content' | 'read' | 'message'
  ): any {
    if (this.contact !== undefined || this.contact !== null) {
      if (this.validationModelService.isMessageReadStatus(this.contact)) {
        switch (property) {
          case 'url': {
            return this.contact.message_id.group_id === null
              ? this.contact!.message_id!.recipient_id!.profile_picture
              : this.contact!.message_id.group_id!.url;
          }
          case 'name': {
            return this.contact.message_id.group_id === null
              ? this.contact.message_id.recipient_id.name
              : this.contact.message_id.group_id.name;
          }
          case 'date': {
            const createdAt: Date = new Date(
              this.contact!.message_id!.created_at
            );
            const updatedAt: Date = new Date(
              this.contact!.message_id!.updated_at
            );
            const selectedDate =
              this.contact!.message_id!.created_at >
              this.contact!.message_id!.updated_at
                ? this.contact!.message_id!.created_at
                : this.contact!.message_id!.updated_at;
            const datePipe = new DatePipe('en-US');
            return datePipe.transform(selectedDate, 'dd/MM/yyyy');
          }
          case 'content': {
            return this.contact!.message_id!.content;
          }
          case 'read': {
            return !this.contact!.is_read;
          }
          case 'message': {
            return true;
          }
        }
      }
      if (this.validationModelService.isUser(this.contact)) {
        switch (property) {
          case 'name': {
            return this.contact?.name;
          }
          case 'content': {
            return this.contact?.user_hashtag_id.map(
              (hastag: any) => hastag.name + ' '
            );
          }
          case 'date': {
            return null;
          }
          case 'read': {
            return true;
          }
          case 'url': {
            return this.contact?.profile_picture;
          }
          case 'message': {
            return false;
          }
        }
      }
      return null;
    }
  }
}
