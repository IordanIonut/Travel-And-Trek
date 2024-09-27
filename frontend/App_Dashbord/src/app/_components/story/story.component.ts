import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [NgFor, MaterialModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.scss'
})
export class StoryComponent {
  items= Array(10);
}
