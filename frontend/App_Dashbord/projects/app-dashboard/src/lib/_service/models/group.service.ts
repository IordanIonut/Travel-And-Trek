// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of, switchMap } from 'rxjs';
// import {
//   Environment,
//   GroupDetailDTO,
//   GroupDTO,
// } from 'travel-and-trek-app-core/dist/app-core';
// import {
//   setLoadingOnRequest,
//   SkeletonService,
// } from '../common/skeleton.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class GroupService {
//   private apiUrl = Environment.baseUrl + '/api/group';
//   constructor(
//     private http: HttpClient,
//     private skeletonService: SkeletonService
//   ) {}

//   findGroupsByName(
//     name: string,
//     search: string,
//     page: number,
//     size: number
//   ): Observable<GroupDTO[]> {
//     const params = new HttpParams()
//       .append('name', name)
//       .append('search', search)
//       .append('page', page)
//       .append('size', size);
//     return this.http
//       .get<GroupDTO[]>(`${this.apiUrl}/suggesters/group`, {
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

//   findGroupDetailsByName(name: string): Observable<GroupDetailDTO | null> {
//     return this.http
//       .get<GroupDetailDTO>(`${this.apiUrl}/get/details?name=${name}`)
//       .pipe(
//         switchMap((data) => {
//           if (data) {
//             return of(data);
//           }
//           return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//         })
//       );
//   }
// }
