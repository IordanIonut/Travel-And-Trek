import { Routes } from '@angular/router';
import { LoginComponent } from './_page/login/login.component';
import { RegisterComponent } from './_page/register/register.component';
import { PasswordComponent } from './_page/password/password.component';

export const routes: Routes = [
  {
    path: 'authentication',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: PasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
];
