import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Environment } from '../_environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private _cookieService: CookieService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkTokenExpiration(Environment.jwtToken);
  }

  saveToken(name: string, token: string): void {
    this._cookieService.set(name, token, {
      expires: 7,
      secure: location.protocol === 'https:',
      sameSite: 'Lax',
      path: '/',
    });
    this.checkTokenExpiration(name);
  }

  getToken(name: string): string | null {
    return this._cookieService.get(name) || null;
  }

  decodeToken(name: string): any {
    const token = this.getToken(name);
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getTokenExpiration(name: string): number | null {
    const decodedToken = this.decodeToken(name);
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp * 1000;
    }
    return null;
  }

  isTokenExpired(name: string): boolean {
    const expiration = this.getTokenExpiration(name);
    if (expiration) {
      const currentTime = new Date().getTime();
      return currentTime > expiration;
    }
    return true;
  }

  checkTokenExpiration(name: string): void {
    if (this.isTokenExpired(name)) {
      this.logout(name);
    } else {
      const expirationTime = this.getTokenExpiration(name);
      if (expirationTime) {
        const timeout = expirationTime - new Date().getTime();
        setTimeout(() => this.logout(name), timeout);
      }
    }
  }

  getUserInfo(): {
    name: string;
    email: string;
    img: string;
    hashtag: string[];
  } | null {
    const decodedToken = this.decodeToken(Environment.jwtToken);

    if (decodedToken) {
      const userInfo = {
        name: decodedToken.name ?? '',
        email: decodedToken.email ?? '',
        img: decodedToken.img ?? '',
        hashtag: decodedToken.hastag ?? [],
      };
      return userInfo;
    } else {
      return null;
    }
  }

  logout(name: string): void {
    this._cookieService.delete(name, '/');
  }
}
