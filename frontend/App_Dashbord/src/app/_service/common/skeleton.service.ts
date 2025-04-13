import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkeletonService {
  isLoading: boolean = true;

  setLoading(state: boolean): void {
    this.isLoading = state;
  }
}

export function setLoadingOnRequest(skeletonService: SkeletonService) {
  return <T>(source: Observable<T>) =>
    source.pipe(
      tap(() => skeletonService.setLoading(true)), 
      finalize(() => skeletonService.setLoading(false))
    );
}
