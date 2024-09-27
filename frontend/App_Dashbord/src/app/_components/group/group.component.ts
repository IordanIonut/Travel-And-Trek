import { Component } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss'
})
export class GroupComponent {

}
