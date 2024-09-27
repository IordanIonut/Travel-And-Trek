import { Component } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-place',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent {

}
