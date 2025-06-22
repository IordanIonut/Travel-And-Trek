// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of, switchMap } from 'rxjs';
// import {
//   Environment,
//   Post,
//   UserDTO,
// } from 'travel-and-trek-app-core/dist/app-core';
// import {
//   setLoadingOnRequest,
//   SkeletonService,
// } from '../common/skeleton.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class HashtagService {
//   private apiUrl = Environment.baseUrl + '/api/hashtags';

//   constructor(
//     private http: HttpClient,
//     private skeletonService: SkeletonService
//   ) {}

//   getPostByTag(
//     hashtags: string[],
//     index: number,
//     number: number
//   ): Observable<Post[]> {
//     let params = new HttpParams()
//       .set('index', index.toString())
//       .set('number', number.toString());
//     hashtags.forEach((tag) => {
//       params = params.append('hashtags', tag);
//     });
//     return this.http.get<Post[]>(`${this.apiUrl}/get/post`, { params }).pipe(
//       switchMap((data) => {
//         if (Array.isArray(data) && data.length === 0) {
//           return of(data);
//         }
//         return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//       })
//     );
//   }

//   getUserByTag(
//     name: string,
//     hashtags: string[],
//     index: number,
//     number: number
//   ): Observable<UserDTO[]> {
//     let params = new HttpParams()
//       .set('name', name)
//       .set('index', index.toString())
//       .set('number', number.toString());
//     hashtags.forEach((tag) => {
//       params = params.append('hashtags', tag);
//     });
//     return this.http.get<UserDTO[]>(`${this.apiUrl}/get/user`, { params }).pipe(
//       switchMap((data) => {
//         if (Array.isArray(data) && data.length === 0) {
//           return of(data);
//         }
//         return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//       })
//     );
//   }
// }
