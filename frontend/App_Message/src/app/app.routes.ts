import { Routes } from '@angular/router';
import { MessageComponent } from './_pages/message/message.component';

export const routes: Routes = [
  {
    path: 'message',
    children: [
      {
        path: 'chat',
        children: [
          { path: 'all', component: MessageComponent },
          { path: 'peaples', component: MessageComponent },
          { path: 'groups', component: MessageComponent },
          { path: 'new', component: MessageComponent },
        ],
      },
      { path: '', redirectTo: 'chat/all', pathMatch: 'full' },
    ],
  },
];
