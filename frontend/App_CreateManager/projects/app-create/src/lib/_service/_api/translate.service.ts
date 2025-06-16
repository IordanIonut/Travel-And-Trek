import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class TranslateApiService {
  private apiUrlText = `${Environment.TRANSLATIONS_URL}`;

  private apiUrlDetection = `${Environment.TRANSLATIONS_DETECTION_URL}`;

  constructor(private http: HttpClient) {}

  checkLangues(text: string): Observable<{ iso: string; language: string }> {
    return this.http.get<{ iso: string; language: string }>(
      `${Environment.baseUrl}/api/detect-language?text=${encodeURIComponent(
        text
      )}`
    );
  }

  checkTranslate(
    text: string,
    source: string,
    target: string
  ): Observable<any> {
    const body = {
      q: text,
      source: source,
      target: target,
    };
    const headers = new HttpHeaders({
      'x-rapidapi-key': Environment.RAPID_API_KEY,
      'x-rapidapi-host': Environment.TRANSLATIONS_HOST,
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrlText}`, body, {
      headers,
    });
  }
}
