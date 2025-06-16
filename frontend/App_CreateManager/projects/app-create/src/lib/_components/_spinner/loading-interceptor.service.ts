import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    this.spinnerService.show();
    return next.handle(req).pipe(finalize(() => this.spinnerService.hide()));
  }
}
