import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SetThemeService {
  private activeTheme: string = 'light-theme'; // Default theme

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.applyTheme();
    }
  }

  setTheme(theme: string) {
    this.activeTheme = theme;
    this.applyTheme();
  }

  private applyTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const body = document.body;
      body.className = '';
      body.classList.add(this.activeTheme);
    }
  }

  getActiveTheme(): string {
    return this.activeTheme;
  }



  /*
  themes = ['default-theme', 'dark-theme', 'light-theme'];

  constructor(
    private setThemeService: SetThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('light-theme'); // Set initial theme
    }
  }

  setTheme(theme: string) {
    this.setThemeService.setTheme(theme);
  }
  */
}
