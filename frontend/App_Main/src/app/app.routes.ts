import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import(
            'travel-and-trek-app-authentification/dist/app-authentication'
          ).then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import(
            'travel-and-trek-app-authentification/dist/app-authentication'
          ).then((m) => m.RegisterComponent),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import(
            'travel-and-trek-app-authentification/dist/app-authentication'
          ).then((m) => m.PasswordComponent),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import(
            'travel-and-trek-app-authentification/dist/app-authentication'
          ).then((m) => m.ChangeComponent),
      },
    ],
  },
  // { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
];
