import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { SetThemeService } from 'travel-and-trek-app-core/dist/app-core';
import { Page } from 'travel-and-trek-app-core/dist/app-core';
import { NavbarComponent } from 'travel-and-trek-app-core/dist/app-core';
import { Position } from 'travel-and-trek-app-core/dist/app-core/lib/_types/_frontend/position';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MaterialModule,
    NavbarComponent,
    RouterModule,
  ],
  providers: [SetThemeService],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  pages: Page[] = [
    { icon: 'home', route: '/dashboard/feet' },
    { icon: 'add', route: '' },
    { icon: 'movie', route: '/dashboard/reel' },
    { icon: 'message', route: '' },
  ];
  style: boolean = false;
  selectedIndex: number = 0;
  position: Position = { pos_x: 38, pos_y: 28 };

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private setThemeService: SetThemeService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('cyan-theme');
    }
  }
}
