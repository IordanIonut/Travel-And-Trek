import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class PhotoDescribeService {
  private apiUrl = `${Environment.PHOTO_DESCRIBE_URL}/description-from-file`;

  constructor(private http: HttpClient) {}

  checkImageForDescribe(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    const headers = new HttpHeaders({
      'x-rapidapi-key': Environment.RAPID_API_KEY,
      'x-rapidapi-host': Environment.PHOTO_DESCRIBE_HOST,
    });

    return this.http.post<any>(this.apiUrl, formData, { headers });
  }
}
