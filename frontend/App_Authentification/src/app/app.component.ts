import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  JwtService,
  MaterialModule,
} from 'travel-and-trek-app-core/dist/app-core';
import { SetThemeService } from 'travel-and-trek-app-core/dist/app-core';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        CommonModule,
        MaterialModule,
        HttpClientModule,
        RouterModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [SetThemeService],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private setThemeService: SetThemeService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('cyan-theme');
    }
  }
}
