import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-masthead',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './masthead.component.html',
  styleUrl: './masthead.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MastheadComponent {

}
