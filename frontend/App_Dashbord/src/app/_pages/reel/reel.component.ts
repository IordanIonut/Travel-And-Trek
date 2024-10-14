import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { MastheadComponent } from '../../_components/masthead/masthead.component';
import { NgFor } from '@angular/common';
import { VideoComponent } from "../../_components/video/video.component";

@Component({
  selector: 'app-reel',
  standalone: true,
  imports: [MaterialModule, MastheadComponent, NgFor, VideoComponent],
  templateUrl: './reel.component.html',
  styleUrl: './reel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ReelComponent {
  items = Array(10);
}
