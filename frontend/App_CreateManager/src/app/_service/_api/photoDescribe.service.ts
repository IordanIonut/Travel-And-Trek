import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';
import { Client } from '@gradio/client';
import { SpinnerService } from 'src/app/_components/_spinner/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoDescribeService {
  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {}

  private clientPromise = Client.connect('WillemVH/Image_To_Text_Description');

  async describeImage(file: File): Promise<string> {
    try {
      this.spinnerService.show();
      const client = await this.clientPromise;
      const result = await client.predict('/feifeichat', {
        image: file,
      });

      return result.data as string;
    } finally {
      this.spinnerService.hide();
    }
  }
}
