import { Routes } from '@angular/router';
import { RegisterComponent } from 'projects/app-authentication/src/public-api';

export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import(
            '../../projects/app-authentication/src/lib/_page/login/login.component'
          ).then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import(
            '../../projects/app-authentication/src/lib/_page/register/register.component'
          ).then((m) => m.RegisterComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import(
            '../../projects/app-authentication/src/lib/_page/password/password.component'
          ).then((m) => m.PasswordComponent),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import(
            '../../projects/app-authentication/src/lib/_page/change/change.component'
          ).then((m) => m.ChangeComponent),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
];
