import { Injectable } from '@angular/core';
import ColorThief from 'colorthief';

@Injectable({
  providedIn: 'root',
})
export class ShadowService {
  private colorThief: ColorThief = new ColorThief();

  applyShadowDialog(img: HTMLImageElement): void {
    const dominantColor = this.colorThief.getColor(img);
    const shadowColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.75)`;
    const overlayPane = document.querySelector(
      '.cdk-overlay-pane.mat-mdc-dialog-panel'
    );

    if (overlayPane instanceof HTMLElement) {
      overlayPane.style.boxShadow = `0px 0px 25px 20px ${shadowColor}`;
      // console.log('Box shadow applied:', shadowColor);
    } else {
      console.error('Overlay pane not found or is not an HTMLElement');
    }
  }
  applyShadowStory(img: HTMLImageElement, con: HTMLElement): void {
    if (!img || !con) {
      return;
    }
    if (img.complete && img.naturalWidth !== 0 && img.naturalHeight !== 0) {
      const dominantColor = this.colorThief!.getColor(img);
      const shadowColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.75)`;
      con!.style.borderColor = shadowColor;
      con!.style.boxShadow = `0 0 4px 4px ${shadowColor}`;
    } else {
      img.onload = () => {
        const dominantColor = this.colorThief!.getColor(img);
        const shadowColor = `rgba(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]}, 0.75)`;
        con.style.borderColor = shadowColor;
        con.style.boxShadow = `0 0 4px 4px ${shadowColor}`;
      };
    }
  }

  applyShadowToContainer1(img: HTMLImageElement, container: HTMLElement): void {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        throw new Error('Canvas context is not available.');
      }
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, img.width, img.height);

      const color1 = context.getImageData(0, 0, 1, 1).data;
      const color2 = context.getImageData(
        img.width - 1,
        img.height - 1,
        1,
        1
      ).data;
      const color1Rgba = `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.75)`;
      const color2Rgba = `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.75)`;

      container.style.background = `linear-gradient(135deg, ${color1Rgba}, ${color2Rgba})`;
    } catch (error) {
      console.error('Error applying shadow to container:', error);
    }
  }

  applyShadowToContainer2(
    img1: HTMLImageElement,
    img2: HTMLImageElement,
    container: HTMLElement
  ): void {
    try {
      const canvas1 = document.createElement('canvas');
      const canvas2 = document.createElement('canvas');
      const context1 = canvas1.getContext('2d', { willReadFrequently: true });
      const context2 = canvas2.getContext('2d', { willReadFrequently: true });

      if (!context1 || !context2) {
        throw new Error('Canvas context is not available.');
      }

      canvas1.width = img1.width;
      canvas1.height = img1.height;
      canvas2.width = img2.width;
      canvas2.height = img2.height;

      context1.drawImage(img1, 0, 0, img1.width, img1.height);
      context2.drawImage(img2, 0, 0, img2.width, img2.height);

      const color1 = context1.getImageData(0, 0, 1, 1).data;
      const color2 = context2.getImageData(
        img2.width - 1,
        img2.height - 1,
        1,
        1
      ).data;

      const color1Rgba = `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.75)`;
      const color2Rgba = `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.75)`;

      container.style.background = `linear-gradient(135deg, ${color1Rgba}, ${color2Rgba})`;
    } catch (error) {
      console.error('Error applying shadow to container:', error);
    }
  }

  applyShadowToContainer3(
    img1: HTMLImageElement,
    img2: HTMLImageElement,
    img3: HTMLImageElement,
    container: HTMLElement
  ): void {
    try {
      const canvas1 = document.createElement('canvas');
      const canvas2 = document.createElement('canvas');
      const canvas3 = document.createElement('canvas');
      const context1 = canvas1.getContext('2d', { willReadFrequently: true });
      const context2 = canvas2.getContext('2d', { willReadFrequently: true });
      const context3 = canvas3.getContext('2d', { willReadFrequently: true });
      if (!context1 || !context2 || !context3) {
        throw new Error('Canvas context is not available.');
      }
      canvas1.width = img1.width;
      canvas1.height = img1.height;
      canvas2.width = img2.width;
      canvas2.height = img2.height;
      canvas3.width = img3.width;
      canvas3.height = img3.height;

      context1.drawImage(img1, 0, 0, img1.width, img1.height);
      context2.drawImage(img2, 0, 0, img2.width, img2.height);
      context3.drawImage(img3, 0, 0, img3.width, img3.height);

      const color1 = context1.getImageData(0, 0, 1, 1).data;
      const color2 = context2.getImageData(img2.width - 1, 0, 1, 1).data;
      const color3 = context3.getImageData(
        img3.width / 2,
        img3.height - 1,
        1,
        1
      ).data;

      const color1Rgba = `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.75)`;
      const color2Rgba = `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.75)`;
      const color3Rgba = `rgba(${color3[0]}, ${color3[1]}, ${color3[2]}, 0.75)`;

      container.style.background = `linear-gradient(135deg, ${color1Rgba}, ${color2Rgba}, ${color3Rgba})`;
    } catch (error) {
      console.error('Error applying shadow to container:', error);
    }
  }

  applyShadowFromVideo(
    videoElement: HTMLVideoElement,
    container: HTMLElement
  ): void {
    try {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) {
        throw new Error('Canvas context is not available.');
      }
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const color1 = context.getImageData(0, 0, 1, 1).data;
      const color2 = context.getImageData(
        canvas.width - 1,
        canvas.height - 1,
        1,
        1
      ).data;
      const color1Rgba = `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 0.75)`;
      const color2Rgba = `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 0.75)`;
      container.style.background = `linear-gradient(135deg, ${color1Rgba}, ${color2Rgba})`;
    } catch (error) {
      console.error('Error applying shadow to container from video:', error);
    }
  }

  updateShadowFromVideo(
    videoElement: HTMLVideoElement,
    container: HTMLElement
  ): void {
    const updateInterval = setInterval(() => {
      if (videoElement.paused || videoElement.ended) {
        clearInterval(updateInterval);
      } else {
        this.applyShadowFromVideo(videoElement, container);
      }
    }, 100);
  }
}
