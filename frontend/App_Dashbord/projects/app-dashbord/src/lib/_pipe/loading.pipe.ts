import { Pipe, PipeTransform } from '@angular/core';
import { finalize, Observable, startWith } from 'rxjs';

@Pipe({
  name: 'loading',
  standalone: true,
})
export class LoadingPipe implements PipeTransform {
  transform(
    value: Observable<any>,
    isLoading: { value: boolean }
  ): Observable<any> {
    isLoading.value = true;
    return value.pipe(
      startWith(null),
      finalize(() => (isLoading.value = false))
    );
  }
}
