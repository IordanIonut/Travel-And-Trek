import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { SetThemeService } from 'travel-and-trek-app-core/dist/app-core';
import { Page } from './types/page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MaterialModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SetThemeService],
})
export class AppComponent {
  pages: Page[] = [
    { icon: 'home', route: '/authentification/login' },
    { icon: 'search', route: '/authentification/register' },
    { icon: 'notifications', route: '/authentification/forgot-password' },
  ];
  style: boolean = true;
  selectedIndex: number = 0;

  @ViewChildren('navItem') navItems!: QueryList<ElementRef>;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.updateCenterCirclePosition();
      }, 0);

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.updateSelectedIndex(event.urlAfterRedirects);
        }
      });
    }
  }

  private updateSelectedIndex(url: string) {
    const index = this.pages.findIndex((page) => page.route === url);

    if (index >= 0 && index < this.pages.length) {
      this.selectedIndex = index;
    } else {
      console.error('Selected index is out of bounds or URL not found:', url);
      this.selectedIndex = 0;
    }

    this.updateCenterCirclePosition();
  }

  private updateCenterCirclePosition() {
    if (!this.navItems || !this.navItems.length) {
      console.log('No navItems available.');
      return;
    }

    if (
      this.selectedIndex === null ||
      this.selectedIndex >= this.navItems.length
    ) {
      console.log('Selected index is out of bounds.');
      this.selectedIndex = 0;
    }

    const navItemsArray = this.navItems.toArray();
    const navItem = navItemsArray[this.selectedIndex]?.nativeElement;

    if (navItem instanceof HTMLElement) {
      try {
        const rect = navItem.getBoundingClientRect();
        const centerCircle = document.querySelector(
          '.center-circle'
        ) as HTMLElement;

        if (centerCircle) {
          centerCircle.style.left = `${rect.left + rect.width / 2 -14}px`;
          centerCircle.style.top = `${rect.top + rect.height / 2 - 10}px`;
          centerCircle.style.transform = 'translate(-50%, -50%)';
        } else {
          console.log('Center circle element not found.');
        }
      } catch (e) {
        console.error('Error getting bounding rect:', e);
      }
    } else {
      console.log('navItem is not an HTMLElement:', navItem);
    }
  }

  onPageClick(index: number) {
    this.selectedIndex = index;
    this.updateCenterCirclePosition();
  }
}
