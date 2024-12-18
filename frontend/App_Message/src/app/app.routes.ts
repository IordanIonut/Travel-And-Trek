import { Routes } from '@angular/router';
import { MessageComponent } from './_pages/message/message.component';

export const routes: Routes = [
  {
    path: 'message',
    children: [
      { path: 'chat', component: MessageComponent },
      { path: '', redirectTo: 'chat', pathMatch: 'full' },
    ],
  },
];
