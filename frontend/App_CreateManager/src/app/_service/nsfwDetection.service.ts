import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'src/environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class NsfwDetectionService {
  private apiUrl = `${Environment.NSFW_URL}/image`;

  constructor(private http: HttpClient) {}

  checkImageForNsfw(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    const headers = new HttpHeaders({
      'x-rapidapi-key': Environment.RAPID_API_KEY,
      'x-rapidapi-host': Environment.NSFW_HOST,
    });

    return this.http.post<any>(this.apiUrl, formData, { headers });
  }
}
