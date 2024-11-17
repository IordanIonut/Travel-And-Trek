import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/app/environments/environment";

@Injectable({
    providedIn: 'root'
  })

export class ShareService{
    private apiUrl = environment.baseUrl + '/share';

    constructor(private http: HttpClient) {}
  
}