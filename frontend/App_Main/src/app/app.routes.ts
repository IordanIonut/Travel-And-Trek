import { Routes } from '@angular/router';
import {
  ChangeComponent,
  LoginComponent,
  PasswordComponent,
  RegisterComponent,
} from 'travel-app-trek-app-authentication/';

export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot-password', component: PasswordComponent },
      { path: 'change-password', component: ChangeComponent },
    ],
  },
  { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
];
