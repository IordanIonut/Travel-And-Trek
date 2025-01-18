import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import ColorThief from 'colorthief';
import { ShadowService } from 'src/app/_service/shadow/shadow.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
  colorThief: ColorThief = new ColorThief();

  constructor(private elementRef: ElementRef, private shadow: ShadowService, @Inject(MAT_DIALOG_DATA) public data: { image: string }) {
  }

  ngAfterViewInit(): void {
  }

  onImageLoad(img: HTMLImageElement): void {
    this.shadow.applyShadowDialog(img);
  }
}