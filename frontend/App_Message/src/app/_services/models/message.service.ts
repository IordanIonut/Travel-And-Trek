import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/_type/models/message';
import { Environment } from 'travel-and-trek-app-core/dist/app-core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = Environment.baseUrl + '/api/message';
  constructor(private http: HttpClient) {}
}
