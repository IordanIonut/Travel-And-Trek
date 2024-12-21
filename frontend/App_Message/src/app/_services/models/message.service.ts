import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from 'src/app/_type/models/message';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = environment.baseUrl + '/message';
  constructor(private http: HttpClient) {}

}
