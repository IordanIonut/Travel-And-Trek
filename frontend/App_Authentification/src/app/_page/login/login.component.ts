import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import {
  NavbarComponent,
  Page,
  SetThemeService,
} from 'travel-and-trek-app-core/dist/app-core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { RouterLink, RouterModule } from '@angular/router';
import { CButtonComponent } from 'src/app/_components/c-button/c-button.component';
import { GOOGLE_LOGO_URL } from 'src/app/_constant/constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  google = GOOGLE_LOGO_URL;

  constructor(
    private setThemeService: SetThemeService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.setThemeService.setTheme('cyan-theme');
    }
  }

  ngOnInit() {}

  onClickGoogle() {}

  onClickSignIn() {}
}
