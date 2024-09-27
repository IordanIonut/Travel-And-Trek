import { Component } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './person.component.html',
  styleUrl: './person.component.scss'
})
export class PersonComponent {

}
