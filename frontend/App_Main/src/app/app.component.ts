import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
  ChangeDetectorRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  NgZone,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import {
  NavbarComponent,
  Page,
  Position,
  SetThemeService,
} from 'travel-and-trek-app-core/dist/app-core';
import {
  SpinnerComponent,
  TranslateDialogComponent,
} from 'travel-and-trek-app-create/dist/app-create';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    CommonModule,
    SpinnerComponent,
    TranslateDialogComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  showNavbar = true;
  pages: Page[] = [
    { icon: 'home', route: '/dashboard/feet' },
    { icon: 'add', route: '/create/post' },
    { icon: 'movie', route: '/dashboard/reel' },
    { icon: 'message', route: '' },
  ];
  style: boolean = false;
  selectedIndex: number = 0;
  position: Position = { pos_x: 38, pos_y: 28 };

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    private setThemeService: SetThemeService,
    private zone: NgZone
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('cyan-theme');
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          this.showNavbar = this.isShowNavBar(event);

          const lastUrl = sessionStorage.getItem('lastUrl');
          if (
            lastUrl !== event.urlAfterRedirects &&
            (!this.isShowNavBar(lastUrl) || !this.isShowNavBar(event))
          ) {
            sessionStorage.setItem('lastUrl', event.urlAfterRedirects);
            window.location.reload();
          }
        });
    }
  }

  private isShowNavBar(event: { urlAfterRedirects: string } | string): boolean {
    const url =
      typeof event === 'string' ? event : event?.urlAfterRedirects ?? '';

    return !url.startsWith('/authentication') && !url.startsWith('/create');
  }
}
