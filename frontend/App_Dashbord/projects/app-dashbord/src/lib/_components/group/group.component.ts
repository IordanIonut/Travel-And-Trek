import { CommonModule, NgFor, NgIf, SlicePipe } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FollowerStatusIconPipe } from 'projects/app-dashbord/src/lib/_pipe/follower-status-icon.pipe';
import { SkeletonService } from 'projects/app-dashbord/src/lib/_service/common/skeleton.service';
import { DialogService } from 'projects/app-dashbord/src/lib/_service/dialog/dialog.service';
import { FollowService } from 'projects/app-dashbord/src/lib/_service/models/follower.service';
import { GroupMembershipService } from 'projects/app-dashbord/src/lib/_service/models/group-membership.service';
import {
  GroupDTO,
  GroupMembership,
  GroupMembershipEnum,
  JwtService,
  MaterialModule,
  ShadowService,
  User,
} from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [MaterialModule, CommonModule, SlicePipe, FollowerStatusIconPipe],
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
    private _jwtService: JwtService,
    private router: Router,
    protected _skeletonService: SkeletonService
  ) {}

  ngOnInit(): void {
    this.length = this.group.friends.length + this.group.followers.length;
  }

  private hasAppliedColor = false;
  ngAfterViewChecked(): void {
    if (this.hasAppliedColor) return;

    if (this.im && this.con) {
      const imgElement = this.im.nativeElement;
      const containerElement = this.con.nativeElement;
      imgElement.crossOrigin = 'anonymous';

      if (imgElement.complete) {
        this.shadow.applyShadowToContainer1(imgElement, containerElement);
        this.hasAppliedColor = true;
      } else {
        imgElement.addEventListener(
          'load',
          () => {
            if (!this.hasAppliedColor) {
              this.shadow.applyShadowToContainer1(imgElement, containerElement);
              this.hasAppliedColor = true;
            }
          },
          { once: true }
        );
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
    this.router.navigate(['/dashboard/profile'], {
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

      const groupMembership: GroupMembership = {
        id: {
          id: '',
          role: GroupMembershipEnum.PENDING,
        },
        group_id: this.group.group,
        user_id: {
          id: '',
          name: this._jwtService.getUserInfo()!.name!,
        } as User,
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
