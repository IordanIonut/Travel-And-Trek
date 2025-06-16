import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class HashtagGenerateService {
  private apiUrl = `${Environment.GENERATE_HASHTAGS_URL}/stats/hashtag-suggestions`;

  constructor(private http: HttpClient) {}

  checkHashtagGenerate(text: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-key': Environment.RAPID_API_KEY,
      'x-rapidapi-host': Environment.GENERATE_HASHTAGS_HOST,
    });

    return this.http.get<any>(`${this.apiUrl}/${text}`, { headers });
  }
}
