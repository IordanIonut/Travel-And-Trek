import {
  GoogleSigninButtonModule,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { GoogleSigninService } from './google.service';
import { GOOGLE_LOGO_URL } from 'src/app/_constant/constant';

@Component({
  selector: 'app-google',
  standalone: true,
  imports: [GoogleSigninButtonModule, SocialLoginModule],
  templateUrl: './google.component.html',
  styleUrl: './google.component.scss',
})
export class GoogleComponent {
  google = GOOGLE_LOGO_URL;

  constructor(private _googleSigninService: GoogleSigninService) {}

  onClickGoogle() {
    // this._googleSigninService.signInWithGoogle().then((data) => {
    //   console.log(data);
    // });
    this._googleSigninService.signOut().then((data) => {
      console.log(data);
    });
  }
}
