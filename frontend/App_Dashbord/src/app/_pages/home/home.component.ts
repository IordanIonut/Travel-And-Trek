import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { PostComponent } from '../../_components/post/post.component';
import { StoryComponent } from '../../_components/story/story.component';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { UserService } from 'src/app/_service/models/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MaterialModule,
    PostComponent,
    StoryComponent,
    MastheadComponent,
    HttpClientModule,
  ],
  providers: [UserService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  constructor(private cdr: ChangeDetectorRef) {}
}
