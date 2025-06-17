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
  // {
  //   path: 'dashboard',
  //   children: [
  //     { path: 'feet', component: HomeComponent },
  //     { path: 'search', component: SearchComponent },
  //     { path: 'reel', component: ReelComponent },
  //     { path: 'profile', component: ProfileComponent },
  //     { path: '', redirectTo: 'feet', pathMatch: 'full' },
  //   ],
  // },
  { path: '', redirectTo: '/authentication/login', pathMatch: 'full' },
];
