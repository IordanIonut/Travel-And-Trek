import { Routes } from '@angular/router';
import { HomeComponent } from './_pages/home/home.component';
import { SearchComponent } from './_pages/search/search.component';
import { ReelComponent } from './_pages/reel/reel.component';
import { CreatePostComponent } from './_pages/create-post/create-post.component';
import { ProfileComponent } from './_pages/profile/profile.component';

export const routes: Routes = [
  {
    path: 'dashbord',
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'reel', component: ReelComponent },
      { path: 'create-post', component: CreatePostComponent },
      { path: 'profile', component: ProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
