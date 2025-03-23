import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(private _cookieService: CookieService, private _router: Router) {
    this.checkTokenExpiration();
  }

  saveToken(token: string): void {
    this._cookieService.set('token', token, {
      expires: 1,
      secure: true,
      sameSite: 'Strict',
    });
    this.checkTokenExpiration();
  }

  getToken(): string | null {
    return this._cookieService.get('token') || null;
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getTokenExpiration(): number | null {
    const decodedToken = this.decodeToken();
    if (decodedToken && decodedToken.exp) {
      return decodedToken.exp * 1000;
    }
    return null;
  }

  isTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (expiration) {
      const currentTime = new Date().getTime();
      return currentTime > expiration;
    }
    return true;
  }

  checkTokenExpiration(): void {
    if (this.isTokenExpired()) {
      this.logout();
    } else {
      const expirationTime = this.getTokenExpiration();
      if (expirationTime) {
        const timeout = expirationTime - new Date().getTime();
        setTimeout(() => this.logout(), timeout);
      }
    }
  }

  getUserInfo(): any {
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken : null;
  }

  logout(): void {
    this._cookieService.delete('token');
  }
}
