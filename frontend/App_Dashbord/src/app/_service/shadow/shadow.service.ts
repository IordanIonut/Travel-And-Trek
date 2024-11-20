import { ElementRef, Injectable } from '@angular/core';
import ColorThief from 'colorthief';

@Injectable({
  providedIn: 'root'
})
export class ShadowService {
  private colorThief: ColorThief = new ColorThief();

  applyShadow(img: HTMLImageElement): void {
    const dominantColor = this.colorThief.getColor(img);
    const shadowColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.75)`;
    const overlayPane = document.querySelector('.cdk-overlay-pane.mat-mdc-dialog-panel');

    
    if (overlayPane instanceof HTMLElement) {
      overlayPane.style.boxShadow = `0px 0px 25px 20px ${shadowColor}`;
      // console.log('Box shadow applied:', shadowColor);
    } else {
      console.error('Overlay pane not found or is not an HTMLElement');
    }
  }

  applyShadowToContainer(img: HTMLImageElement, container: HTMLElement): void {
    try {
      const dominantColor = this.colorThief.getColor(img);
      const shadowColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.75)`;

      container.style.boxShadow = `0px 0px 25px 20px ${shadowColor}`;
      container.style.borderRadius = '10px';
    } catch (error) {
      console.error('Error applying shadow to container:', error);
    }
  }
}
