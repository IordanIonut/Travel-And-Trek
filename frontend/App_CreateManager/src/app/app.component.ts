import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateDialogComponent } from 'projects/app-create/src/lib/_components/_dialog/translate-dialog/translate-dialog.component';
import { SpinnerComponent } from 'projects/app-create/src/lib/_components/_spinner/spinner/spinner.component';
import { PostComponent } from 'projects/app-create/src/public-api';
import {
  MaterialModule,
  SetThemeService,
} from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    SpinnerComponent,
    PostComponent,
    TranslateDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SetThemeService],
  encapsulation: ViewEncapsulation.None,
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
