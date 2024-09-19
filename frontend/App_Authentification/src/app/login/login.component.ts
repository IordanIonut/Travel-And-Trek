import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { NavbarComponent, Page, SetThemeService } from 'travel-and-trek-app-core/dist/app-core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink, RouterModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  pages: Page[] = [
    { icon: 'home', route: '/authentification/login' },
    { icon: 'search', route: '/authentification/register' },
  ];
  style: boolean = true;
  selectedIndex: number = 0;
  centerX: number = 33;
  centerY: number = 28;

  constructor(
    private setThemeService: SetThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('cyan-theme');
    }
  }

  ngOnInit() {}
}
