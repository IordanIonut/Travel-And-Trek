import { Component, ViewEncapsulation } from '@angular/core';
import {
  ChangeComponent,
  LoginComponent,
  PasswordComponent,
  RegisterComponent,
} from 'travel-app-trek-app-authentication/dist/app-authentication';
import {
  HomeComponent,
  ProfileComponent,
  ReelComponent,
  SearchComponent,
} from 'travel-and-trek-app-dashboard/dist/app-dashboard';
import { PostComponent } from 'travel-and-trek-app-create/dist/app-create';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    ChangeComponent,
    PasswordComponent,
    HomeComponent,
    ProfileComponent,
    ReelComponent,
    SearchComponent,
    PostComponent,
  ],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PageComponent {}
