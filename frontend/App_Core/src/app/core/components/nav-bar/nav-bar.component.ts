import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { SetThemeService } from '../../../_theme/set-theme.service';
import { isPlatformBrowser, NgFor } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgFor],
  providers: [SetThemeService,],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(){}

  ngOnInit() {
    
  }
}