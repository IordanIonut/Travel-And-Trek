import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogService } from 'projects/app-dashbord/src/lib/_service/dialog/dialog.service';
import { UserService } from 'projects/app-dashbord/src/lib/_service/models/user.service';
import {
  Environment,
  JwtService,
  MaterialModule,
  ShadowService,
  UserProfileDTO,
} from 'travel-and-trek-app-core/dist/app-core';

type ElementType = 'settings' | 'qr_code' | 'logout';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf, HttpClientModule],
  providers: [UserService, ShadowService, JwtService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  userDTO?: UserProfileDTO;
  type!: string;
  elemnts: ElementType[] = ['settings', 'qr_code', 'logout'];

  @ViewChild('con', { static: false })
  con!: ElementRef<HTMLElement>;
  @ViewChild('img', { static: false })
  img!: ElementRef<HTMLImageElement>;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private _dialogService: DialogService,
    private shadowService: ShadowService,
    private _jwtService: JwtService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; type: string }
  ) {
    this.type = data.type;
    this.userService
      .findUserByName(
        data.name === 'name' ? this._jwtService.getUserInfo()!.name! : data.name
      )
      .subscribe({
        next: (data) => {
          this.userDTO = data!;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngAfterViewInit(): void {
    if (this.con && this.img) {
      const image = this.img.nativeElement;
      const content = this.con.nativeElement;
      image.crossOrigin = 'anonymous';
      if (image.complete) {
        this.shadowService?.applyShadowStory(image, content);
      } else {
        image.addEventListener('load', () => {
          this.shadowService?.applyShadowStory(image, content);
        });
      }
    }
  }

  onProfilePage() {
    this.router
      .navigate(['dashboard/profile'], {
        queryParams: {
          type: 'user',
          name:
            this.userDTO?.user.name === null
              ? this._jwtService.getUserInfo()!.name!
              : this.userDTO?.user.name,
        },
      })
      .then(() => {
        window.location.reload();
      });
    this.onClose();
  }

  onClose() {
    this.dialog.closeAll();
  }

  onMake(make: ElementType) {
    console.log(make);
    switch (make) {
      case 'settings': {
        break;
      }
      case 'logout': {
        this._jwtService.logout(Environment.jwtToken);
        break;
      }
      case 'qr_code': {
        this._dialogService.openDialogQrCode(
          'user',
          this._jwtService.getUserInfo()?.name!
        );
        break;
      }
    }
  }
}
