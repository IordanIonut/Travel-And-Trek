import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from 'travel-app-trek-app-authentification/dist/app-authentication';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'App_Main';

  constructor() {}
}
