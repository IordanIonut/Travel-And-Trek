import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SetThemeService} from 'travel-and-trek-app-core/projects/app-core/src/public-api'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [SetThemeService],
})
export class AppComponent {
  title = 'App_Authentification';
}
