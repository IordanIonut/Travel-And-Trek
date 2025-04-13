import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [QRCodeComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss',
})
export class QrCodeComponent {
  url!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { type: 'user' | 'group'; name: string }
  ) {
    this.url = window.location.origin;

    if (data.type === 'user') {
      this.url += '/dashbord/profile?type=user&name=' + data.name;
    }
  }
}
