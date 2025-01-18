import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_service/models/user.service';
import { UserProfileDTO } from 'src/app/_type/dto/user-profile.dto';
import { environment } from 'src/app/environments/environment';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf, HttpClientModule],
  providers: [UserService],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  userDTO?: UserProfileDTO;
  type!: string;
  elemnts: string[] = ['settings', 'qr_code', 'logout'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; type: string }
  ) {
    this.type = data.type;
    this.userService.findUserByName(data.name).subscribe({
      next: (data: UserProfileDTO) => {
        this.userDTO = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onProfilePage() {
    this.router.navigate(
      ['dashbord/profile'],
      {
        queryParams: {
          type: 'user',
          name: this.userDTO?.user.name === null ? environment.user.name : this.userDTO?.user.name
        }
      }
    ).then(() => {
      window.location.reload();
    });
    this.onClose();
  }

  onClose() {
    this.dialog.closeAll();
  }
}
