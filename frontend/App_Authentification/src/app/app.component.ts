import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { SetThemeService } from 'travel-and-trek-app-core/dist/app-core';
import { Page } from 'travel-and-trek-app-core/dist/app-core';
import { NavbarComponent } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MaterialModule,
    NavbarComponent,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SetThemeService],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  pages: Page[] = [
    { icon: 'home', route: '/authentification/login' },
    { icon: 'search', route: '/authentification/register' },
    { icon: 'notifications', route: '/authentification/forgot-password' },
  ];
  style: boolean = false;
  selectedIndex: number = 0;
  centerX: number = 38; 
  centerY: number = 28;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private setThemeService: SetThemeService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('cyan-theme');
    }
  }

 
}
