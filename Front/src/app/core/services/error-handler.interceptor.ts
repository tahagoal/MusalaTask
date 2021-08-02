import { Injectable } from '@angular/core';
import { HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor {
  constructor(
    private httpErrorHandlerService: HttpErrorHandlerService
  ) { }

  /**
   * @description
   * Intercept and handle HTTP errors.
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: any) => {
          // Server or internet connection error occurred
          if (error instanceof HttpErrorResponse) {
            if (!navigator.onLine) {
              this.httpErrorHandlerService.handleNoInternetConnection(error);
            } else {
              this.httpErrorHandlerService.handleHttpError(error);
            }
          }

          // IMPORTANT: Propagate error and rethrow to internal error handler(s)
          // to provide specific default response values
          return throwError(error);
        })
      );
  }
}
