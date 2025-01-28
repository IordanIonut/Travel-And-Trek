import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Share } from "src/app/_type/models/share";
import { environment } from "src/app/environments/environment";

@Injectable({
    providedIn: 'root'
  })

export class ShareService{
    private apiUrl = environment.baseUrl + '/share';

    constructor(private http: HttpClient) {}
  
    getPostByProfile(
      name: string,
      index: number,
      number: number
    ): Observable<Share[]> {
      return this.http.get<Share[]>(
        `${this.apiUrl}/find?name=${name}&index=${index}&number=${number}`
      );
    }

    getAllSharesByGroup(name: string, index: number, number: number):Observable<Share[]>{
      const params = new HttpParams().append('name',name).append('index',index).append('number',number);
      return this.http.get<Share[]>(`${this.apiUrl}/get/group`,{params})
    }
}