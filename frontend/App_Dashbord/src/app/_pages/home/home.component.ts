import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { PostComponent } from "../../_components/post/post.component";
import { StoryComponent } from "../../_components/story/story.component";
import { MastheadComponent } from "../../_components/masthead/masthead.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, PostComponent, StoryComponent, MastheadComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

}
