import { NgClass, NgFor, NgIf, SlicePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FollowerStatusIconPipe } from 'src/app/_pipe/follower-status-icon.pipe';
import { SkeletonService } from 'src/app/_service/common/skeleton.service';
import { DialogService } from 'src/app/_service/dialog/dialog.service';
import { FollowService } from 'src/app/_service/models/follower.service';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import {
  Follow,
  FollowerStatusEnum,
  GenderEnum,
  Hastag,
  MaterialModule,
  User,
  UserDTO,
} from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MaterialModule,
    FollowerStatusIconPipe,
    SlicePipe,
    HttpClientModule,
    NgIf,
    NgClass,
    NgFor,
  ],
  providers: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() people!: UserDTO;
  @Input() shared: boolean = false;

  @ViewChild('con', { static: false })
  con!: ElementRef<HTMLElement>;
  @ViewChild('im', { static: false })
  im!: ElementRef<HTMLImageElement>;
  buttonPosition!: Position;

  length!: number;
  enums = Object.values(FollowerStatusEnum);
  iconName: string[] = ['send', 'schedule', 'cancel', 'close'];

  constructor(
    private shadow: ShadowService,
    private followService: FollowService,
    private dialogService: DialogService,
    private router: Router,
    private elementRef: ElementRef,
    protected _skeletonService: SkeletonService
  ) {
    this._skeletonService.setLoading(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['people']) {
      this._skeletonService.setLoading(!this.people);
    }
  }

  ngOnInit(): void {
    this.length = this.people?.friends.length;
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

  protected onHastagPeaple(hastags: Hastag[]): string {
    return hastags.map((item: Hastag) => '#' + item.name).join(' ');
  }

  protected onExtractLocationName(location: string): string {
    const parts = location.split(',');
    if (parts.length > 1) {
      return (
        parts[0].split(' ').slice(2).join(' ').trim() + ', ' + parts[1].trim()
      );
    }
    return '';
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
    this.router
      .navigate(['/dashbord/profile'], {
        queryParams: { type: 'user', name: name },
      })
      .then(() => {
        window.location.reload();
      });
  }

  protected onFollow(event: Event, user: User) {
    event.stopPropagation();
    if (this.people.state === null) {
      const follow: Follow = {
        id: {
          id: '',
          status: FollowerStatusEnum.PENDING,
        },
        follower_user_id: {
          id: '3103512164211051395',
          user_hashtag_id: [],
          name: '',
          email: '',
          password: '',
          bio: '',
          date_create: new Date(),
          profile_picture: '',
          gender: GenderEnum.F,
          date_of_birth: new Date(),
          date_last_update: new Date(),
          qr_code: '',
          location: '',
        },
        follower_user_id_follower: user,
        created_at: new Date(),
      };

      this.followService.postCreateFollower(follow).subscribe({
        next: (data: any) => {
          this.people.state = FollowerStatusEnum.PENDING;
        },
        error: (error: Error) => {},
      });
    } else if (this.people.state === FollowerStatusEnum.ACCEPTED) {
      this.router.navigate(['/messge/chat']);
    }
  }
}
