// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of, switchMap } from 'rxjs';
// import {
//   Environment,
//   SearchDTO,
//   UserDTO,
//   UserProfileDTO,
// } from 'travel-and-trek-app-core/dist/app-core';
// import {
//   setLoadingOnRequest,
//   SkeletonService,
// } from '../common/skeleton.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class UserService {
//   private apiUrl = Environment.baseUrl + '/api/user';

//   constructor(
//     private http: HttpClient,
//     private skeletonService: SkeletonService
//   ) {}

//   findUserByName(name: String): Observable<UserProfileDTO | null> {
//     return this.http
//       .get<UserProfileDTO>(`${this.apiUrl}/info?name=${name}`)
//       .pipe(
//         switchMap((data) => {
//           if (!data) {
//             return of(data);
//           }
//           return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//         })
//       );
//   }

//   findSuggestersSearch(
//     name: string,
//     type: string,
//     page: number,
//     size: number
//   ): Observable<SearchDTO[]> {
//     const params = new HttpParams()
//       .append('name', name)
//       .append('type', type)
//       .append('page', page)
//       .append('size', size);
//     return this.http.get<SearchDTO[]>(`${this.apiUrl}/suggesters`, { params });
//   }

//   findUsersAndFriendsByName(
//     name: string,
//     search: string,
//     page: number,
//     size: number
//   ): Observable<UserDTO[]> {
//     const params = new HttpParams()
//       .append('name', name)
//       .append('search', search)
//       .append('page', page)
//       .append('size', size);
//     return this.http
//       .get<UserDTO[]>(`${this.apiUrl}/suggesters/user`, {
//         params,
//       })
//       .pipe(
//         switchMap((data) => {
//           if (Array.isArray(data) && data.length === 0) {
//             return of(data);
//           }
//           return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//         })
//       );
//   }
// }
