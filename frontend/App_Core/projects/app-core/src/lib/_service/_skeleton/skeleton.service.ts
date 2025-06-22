import { Injectable } from '@angular/core';
import { tap, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkeletonService {
  private loadingCount = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  setLoading(state: boolean): void {
    if (state) {
      this.loadingCount++;
    } else {
      this.loadingCount = Math.max(this.loadingCount - 1, 0);
    }
    this.loadingSubject.next(this.loadingCount > 0);
  }
}
import { timer } from 'rxjs';

export function setLoadingOnRequest(skeletonService: SkeletonService) {
  return <T>(source: Observable<T>) =>
    source.pipe(
      tap(() => {
        skeletonService.setLoading(true);
      }),
      finalize(() => {
        timer(500)?.subscribe(() => skeletonService.setLoading(false));
      })
    );
}
