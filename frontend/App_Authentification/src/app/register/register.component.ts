import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { SetThemeService } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
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
