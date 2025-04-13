import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./_page/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./_page/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./_page/password/password.component').then(
            (m) => m.PasswordComponent
          ),
      },
      {
        path: 'change-password',
        loadComponent: () =>
          import('./_page/change/change.component').then(
            (m) => m.ChangeComponent
          ),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
];
