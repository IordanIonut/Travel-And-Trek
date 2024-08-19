import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'nav-bar',
    loadComponent: () =>
      import('./core/components/nav-bar/nav-bar.component').then(
        (m) => m.NavBarComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'nav-bar'
  }
];
