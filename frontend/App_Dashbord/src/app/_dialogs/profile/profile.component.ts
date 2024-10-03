import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MaterialModule, NgFor, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent {
  elemnts: string[] = ['settings', 'qr_code', 'logout'];

  constructor() {}
}
