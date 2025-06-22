// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of, switchMap } from 'rxjs';
// import {
//   Environment,
//   Post,
//   PostEnum,
//   PostId,
// } from 'travel-and-trek-app-core/dist/app-core';
// import {
//   setLoadingOnRequest,
//   SkeletonService,
// } from '../common/skeleton.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class PostService {
//   private apiUrl = Environment.baseUrl + '/api/post';
//   constructor(
//     private http: HttpClient,
//     private skeletonService: SkeletonService
//   ) {}

//   getPostByProfileType(
//     name: string,
//     type: PostEnum,
//     index: number,
//     number: number
//   ): Observable<Post[]> {
//     return this.http
//       .get<Post[]>(
//         `${this.apiUrl}/find/type?name=${name}&type=${type}&index=${index}&number=${number}`
//       )
//       .pipe(
//         switchMap((data) => {
//           if (Array.isArray(data) && data.length === 0) {
//             return of(data);
//           }
//           return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//         })
//       );
//   }

//   getPostByProfile(
//     name: string,
//     index: number,
//     number: number
//   ): Observable<Post[]> {
//     return this.http
//       .get<Post[]>(
//         `${this.apiUrl}/find?name=${name}&index=${index}&number=${number}`
//       )
//       .pipe(
//         switchMap((data) => {
//           if (Array.isArray(data) && data.length === 0) {
//             return of(data);
//           }
//           return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//         })
//       );
//   }

//   getPostByUserTag(
//     name: string,
//     index: number,
//     number: number
//   ): Observable<Post[]> {
//     return this.http
//       .get<Post[]>(
//         `${this.apiUrl}/find/tags?name=${name}&index=${index}&number=${number}`
//       )
//       .pipe(
//         switchMap((data) => {
//           if (Array.isArray(data) && data.length === 0) {
//             return of(data);
//           }
//           return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//         })
//       );
//   }

//   getPostBySearch(
//     search: string,
//     index: number,
//     size: number
//   ): Observable<Post[]> {
//     const params = new HttpParams()
//       .append('search', search)
//       .append('index', index)
//       .append('number', size);
//     return this.http.get<Post[]>(`${this.apiUrl}/suggestion`, { params }).pipe(
//       switchMap((data) => {
//         if (Array.isArray(data) && data.length === 0) {
//           return of(data);
//         }
//         return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//       })
//     );
//   }

//   getPostByGroupNameAndType(
//     name: string,
//     type: string | null,
//     index: number,
//     number: number
//   ): Observable<Post[]> {
//     const params = new HttpParams()
//       .append('name', name)
//       .append('index', index)
//       .append('number', number)
//       .append('type', type || '');
//     return this.http.get<Post[]>(`${this.apiUrl}/get/group`, { params }).pipe(
//       switchMap((data) => {
//         if (Array.isArray(data) && data.length === 0) {
//           return of(data);
//         }
//         return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//       })
//     );
//   }

//   getPostById(id: PostId): Observable<Post | null> {
//     return this.http.get<Post>(`${this.apiUrl}/get?id=${id}`).pipe(
//       switchMap((data) => {
//         if (!data) {
//           return of(data);
//         }
//         return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//       })
//     );
//   }

//   getPostByUserFriends(
//     name: string,
//     type: PostEnum,
//     hashtags: string[],
//     index: number,
//     number: number
//   ): Observable<Post[]> {
//     const params = new HttpParams()
//       .append('name', name)
//       .append('type', type)
//       .append('hashtags', (hashtags ?? []).map((item) => item).join(','))
//       .append('index', index)
//       .append('number', number);

//     return this.http.get<Post[]>(`${this.apiUrl}/find/data`, { params }).pipe(
//       switchMap((data) => {
//         if (Array.isArray(data) && data.length === 0) {
//           return of(data);
//         }
//         return of(data).pipe(setLoadingOnRequest(this.skeletonService));
//       })
//     );
//   }
// }
