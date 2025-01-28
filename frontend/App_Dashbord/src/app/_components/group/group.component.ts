import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { FollowerStatusIconPipe } from 'src/app/_pipe/follower-status-icon.pipe';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { FollowService } from 'src/app/_service/models/follower.service';
import { GroupMembershipService } from 'src/app/_service/models/group-membership.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { GroupDTO } from 'src/app/_type/dto/group.dto';
import { GenderEnum } from 'src/app/_type/enum/gender.enum';
import { GroupMembershipEnum } from 'src/app/_type/enum/group-membership.enum';
import { GroupMembership } from 'src/app/_type/models/group-membership';
import { Hastag } from 'src/app/_type/models/hashtag';
import { User } from 'src/app/_type/models/user';
import { environment } from 'src/app/environments/environment';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf, SlicePipe, FollowerStatusIconPipe],
  providers: [
    ShadowService,
    DialogService,
    FollowService,
    GroupMembershipService,
    SlicePipe,
    FollowerStatusIconPipe,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent {
  @Input() group!: GroupDTO;

  @ViewChild('con', { static: false })
  con!: ElementRef<HTMLElement>;
  @ViewChild('im', { static: false })
  im!: ElementRef<HTMLImageElement>;
  buttonPosition!: Position;
  length!: number;

  iconName: string[] = ['cancel', 'cancel', 'schedule'];
  enum = Object.values(GroupMembershipEnum);

  constructor(
    private shadow: ShadowService,
    private groupMembershipService: GroupMembershipService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.length = this.group.friends.length + this.group.followers.length;
  }

  ngAfterViewInit(): void {
    if (this.im !== undefined && this.con !== undefined) {
      const imgElement = this.im!.nativeElement;
      const containerElement = this.con.nativeElement;
      imgElement.crossOrigin = 'anonymous';
      if (imgElement.complete) {
        this.shadow.applyShadowToContainer1(imgElement, containerElement);
      } else {
        imgElement.addEventListener('load', () => {
          this.shadow.applyShadowToContainer1(imgElement, containerElement);
        });
      }
    }
  }

  protected onOpenProfile(event: MouseEvent, name: string): void {
    event.stopPropagation();
    const buttonElement = event.currentTarget as HTMLElement;
    const rect = buttonElement.getBoundingClientRect();
    if (this.con !== undefined) {
      const divHeight = this.con.nativeElement.clientHeight;
      this.buttonPosition = {
        pos_x: rect.x + 470,
        pos_y: rect.y,
      };
      this.dialogService.openDialogProfile(this.buttonPosition, name, 'user');
    }
  }

  protected onSendPage(name: string) {
    this.router.navigate(['/dashbord/profile'], {
      queryParams: { type: 'group', name: name },
    });
  }

  protected onMembership(event: Event) {
    event.stopPropagation();
    console.log(this.group);
    if (
      this.group.groupMembership[0]?.id?.role === GroupMembershipEnum.ADMIN ||
      this.group.groupMembership[0]?.id?.role === GroupMembershipEnum.MEMBER
    ) {
      // console.log('view');
    } else if (
      this.group.groupMembership[0]?.id?.role === GroupMembershipEnum.PENDING
    ) {
      // console.log('pending');
    } else if (this.group.groupMembership === null) {
      console.log('send');

      const u: User = {
        ...environment.user,
        date_create: new Date(environment.user.date_create),
        date_of_birth: new Date(environment.user.date_of_birth),
        date_last_update: new Date(environment.user.date_last_update),
        gender: environment.user.gender === 'M' ? GenderEnum.M : GenderEnum.F,
      };

      const groupMembership: GroupMembership = {
        id: {
          id: '',
          role: GroupMembershipEnum.PENDING,
        },
        group_id: this.group.group,
        user_id: u,
        joined_at: new Date(),
      };

      this.groupMembershipService
        .postCreateGroupMembership(groupMembership)
        .subscribe({
          next: (data: any) => {
            console.log(data);
          },
          error: (error: Error) => {
            console.log(error);
          },
        });
    }
  }

  protected combineFriendsAndFollowers(friends: User[], followers: User[]) {
    return [...friends, ...followers];
  }
}
