import { Routes } from '@angular/router';
import { PostComponent } from 'projects/app-create/src/lib/_components/post/post.component';

export const routes: Routes = [
  {
    path: 'create',
    children: [{ path: 'post', component: PostComponent }],
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
];
