import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from '../material.module';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SetThemeService } from 'travel-and-trek-app-core/dist/app-core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
})
export class PasswordComponent {
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
