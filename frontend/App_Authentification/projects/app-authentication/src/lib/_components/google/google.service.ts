import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleSigninService {
  private isSigningIn = false;
  constructor(private authService: SocialAuthService) {}

  signInWithGoogle(): Promise<SocialUser> {
    if (this.isSigningIn) {
      return Promise.reject('Sign-in already in progress');
    }
    this.isSigningIn = true;
    return this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .finally(() => {
        this.isSigningIn = false;
      });
  }

  signOut(): Promise<void> {
    return this.authService.signOut();
  }
}
