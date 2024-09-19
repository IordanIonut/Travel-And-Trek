import { Component } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { PostComponent } from "../_components/post/post.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, PostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
