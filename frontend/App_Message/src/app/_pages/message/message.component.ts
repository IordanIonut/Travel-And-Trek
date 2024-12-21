import { Component, ElementRef, Type, ViewChild } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { PeapleComponent } from '../../_components/peaple/peaple.component';
import { MessageService } from 'src/app/_services/models/message.service';
import { environment } from 'src/app/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { MessageReadStatus } from 'src/app/_type/models/message-read-status';
import { MessageReadStatusService } from 'src/app/_services/models/message-read-status.service';
import { NgFor, NgIf } from '@angular/common';
import { MessageChatComponent } from 'src/app/_components/message/message.component';
import { TimeComponent } from '../../_components/time/time.component';
import { error } from 'console';
import { User } from 'src/app/_type/models/user';
import { UserDTO } from 'src/app/_type/models/dto/user-dto';
import { UserService } from 'src/app/_services/models/user.service';
import { ActivatedRoute } from '@angular/router';
import { Enum } from 'src/app/_type/models/enum/type';
import { FollowerService } from 'src/app/_services/models/follower.service';
import { FollowerStatusEnum } from 'src/app/_type/models/enum/follower.status.enum';
import { ValidationModelService } from 'src/app/_services/validation/validation-model.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    MaterialModule,
    PeapleComponent,
    PeapleComponent,
    HttpClientModule,
    NgFor,
    NgIf,
    MessageChatComponent,
  ],
  providers: [
    MessageService,
    MessageReadStatusService,
    UserService,
    FollowerService,
    ValidationModelService,
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {
  contacts!: (User | MessageReadStatus)[];
  selected!: number;
  person!: User;
  chats!: MessageReadStatus[];
  user = environment.user;
  userDTO?: UserDTO;
  type!: string;
  @ViewChild('scrollContainer') scrollContainer: any;

  filters: any[] = [
    {
      value: '1',
      icon: 'person',
      name: 'Image',
    },
    {
      value: '1',
      icon: 'person',
      name: 'File',
    },
    {
      value: '1',
      icon: 'person',
      name: 'Post',
    },
    {
      value: '1',
      icon: 'person',
      name: 'Story',
    },
  ];

  constructor(
    private messageReadStatusService: MessageReadStatusService,
    private userService: UserService,
    private followerService: FollowerService,
    private validationModelService: ValidationModelService,
    private activatedRoute: ActivatedRoute
  ) {
    this.type = this.activatedRoute?.snapshot?.routeConfig?.path as string;
    if (
      this.type === Enum.ALL ||
      this.type === Enum.GROUPS ||
      this.type === Enum.PEAPLES
    ) {
      this.messageReadStatusService
        .findConversationsByUser(this.user, this.type)
        .subscribe({
          next: (data: MessageReadStatus[]) => {
            this.contacts = data;
            this.onSelectContact(data[0], 0);
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    } else if (this.type === Enum.NEW) {
      this.followerService
        .findUsersByStatus(this.user, FollowerStatusEnum.ACCEPTED)
        .subscribe({
          next: (data: User[]) => {
            this.contacts = data;
            this.onSelectContact(data[0], 0);
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
  }

  onSelectContact(contact: MessageReadStatus | User, index: number) {
    if (this.validationModelService.isMessageReadStatus(contact)) {
      this.person =
        contact?.message_id?.recipient_id?.name !== this.user
          ? contact?.message_id?.recipient_id
          : contact?.message_id?.sender_id;

      if (contact?.message_id?.group_id === null) {
        this.messageReadStatusService
          .findMessageByUser(
            contact?.message_id?.recipient_id?.name,
            contact?.message_id?.sender_id.name
          )
          .subscribe({
            next: (data: MessageReadStatus[]) => {
              this.chats = data;
            },
            error: (error: Error) => {
              console.log(error);
            },
          });

        this.userService.findUserByName(this.person?.name).subscribe({
          next: (data: UserDTO) => {
            this.userDTO = data;
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
      } else {
        this.messageReadStatusService
          .findMessageReadStatusByGroup(contact?.message_id?.group_id?.id)
          .subscribe({
            next: (data: MessageReadStatus[]) => {
              // console.log(data);
              this.chats = data;
            },
            error: (error: Error) => {
              console.log(error);
            },
          });
      }
    }
    if (this.validationModelService.isUser(contact)) {
      this.person = contact;
      this.userService.findUserByName(this.person?.name).subscribe({
        next: (data: UserDTO) => {
          this.userDTO = data;
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }
    this.selected = index;
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const scrollContainer = this.scrollContainer?.nativeElement;
    const isAtBottom =
      scrollContainer.scrollHeight ===
      scrollContainer.scrollTop + scrollContainer?.clientHeight;
    if (isAtBottom) {
      scrollContainer.scrollTop = scrollContainer?.scrollHeight;
    }
  }

  addMessage(chat: any): void {
    this.chats.push(chat);
    const scrollContainer = this.scrollContainer?.nativeElement;
    const isAtBottom =
      scrollContainer.scrollHeight ===
      scrollContainer?.scrollTop + scrollContainer?.clientHeight;
    if (isAtBottom) {
      this.scrollToBottom();
    }
  }
  protected getContactProperty(
    property: 'name' | 'url' | 'description' | 'groupId' = 'name'
  ): string | boolean | null {
    if (this.contacts !== undefined) {
      const selectedContact = this.contacts[this.selected];
      if (
        selectedContact &&
        this.validationModelService.isMessageReadStatus(selectedContact)
      ) {
        switch (property) {
          case 'name': {
            return selectedContact.message_id?.group_id === null
              ? this.person?.name || 'Unknown'
              : selectedContact.message_id.group_id?.name;
          }
          case 'url': {
            return selectedContact.message_id?.group_id === null
              ? this.person?.profile_picture
              : selectedContact.message_id.group_id.url;
          }
          case 'description': {
            return selectedContact?.message_id?.group_id?.description;
          }
          case 'groupId': {
            return selectedContact!.message_id!.group_id === null;
          }
        }
      }
      if (
        selectedContact &&
        this.validationModelService.isUser(selectedContact)
      ) {
        switch (property) {
          case 'name': {
            return selectedContact.name;
          }
          case 'url': {
            return selectedContact?.profile_picture;
          }
          case 'description': {
            return selectedContact.bio;
          }
          case 'groupId': {
            return true;
          }
        }
      }
    }
    return null;
  }
}
