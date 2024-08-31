import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { SetThemeService } from 'travel-and-trek-app-core/dist/app-core';
import { MaterialModule } from '../material.module';
import { Page } from '../types/page';
import { NavigationEnd, RouterLink, RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  constructor(
    private setThemeService: SetThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('default-theme');
    }
  }

  ngOnInit() {}
}
