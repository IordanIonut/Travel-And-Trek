import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class NsfwDetectionTextService {
  private apiUrl = `${Environment.NSFW_TEXT_URL}/nsfw`;

  constructor(private http: HttpClient) {}

  checkTextForNsfw(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': Environment.RAPID_API_KEY,
      'x-rapidapi-host': Environment.NSFW_TEXT_HOST,
    });

    return this.http.get<any>(`${this.apiUrl}?text=${text}`, {
      headers,
    });
  }
}
