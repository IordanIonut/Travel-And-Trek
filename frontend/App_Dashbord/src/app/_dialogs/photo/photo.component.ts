import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import ColorThief from 'colorthief';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
  colorThief: ColorThief = new ColorThief();

  constructor(private elementRef: ElementRef, private shadow: ShadowService) {
  }

  ngAfterViewInit(): void {
  }

  onImageLoad(img: HTMLImageElement): void {
    this.shadow.applyShadow(img);
    //console.log('Image loaded:', img);
  }
}