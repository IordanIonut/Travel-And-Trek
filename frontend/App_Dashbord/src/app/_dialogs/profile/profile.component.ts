import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_service/models/user.service';
import { UserDTO } from 'src/app/_type/dto/user.dto';
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
  userDTO?: UserDTO;
  elemnts: string[] = ['settings', 'qr_code', 'logout'];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {
    userService.findUserByName(environment.user).subscribe({
      next: (data: UserDTO) => {
        // console.log(data);
        this.userDTO = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onProfilePage() {
    this.router.navigate(['dashbord/profile']);
    this.onClose();
  }

  onClose() {
    this.dialog.closeAll();
  }
}
