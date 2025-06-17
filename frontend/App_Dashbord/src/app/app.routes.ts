import { Routes } from '@angular/router';
import { HomeComponent } from '../../projects/app-dashbord/src/lib/_pages/home/home.component';
import { SearchComponent } from '../../projects/app-dashbord/src/lib/_pages/search/search.component';
import { ReelComponent } from '../../projects/app-dashbord/src/lib/_pages/reel/reel.component';
import { ProfileComponent } from '../../projects/app-dashbord/src/lib/_pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      { path: 'feet', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'reel', component: ReelComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'feet', pathMatch: 'full' },
    ],
  },
];
