import { Component } from '@angular/core';
import {
  ChangeComponent,
  LoginComponent,
  PasswordComponent,
  RegisterComponent,
} from 'travel-app-trek-app-authentication/dist/app-authentication';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    ChangeComponent,
    PasswordComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {}
