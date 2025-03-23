import { Routes } from '@angular/router';
import { PostComponent } from './_components/post/post.component';

export const routes: Routes = [
  {
    path: 'create',
    children: [{ path: 'post', component: PostComponent }],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
