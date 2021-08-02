import { Inject, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

export interface IHttpErrorHandlerService {
  handleNoInternetConnection(error: HttpErrorResponse): void;
  handleHttpError(error: HttpErrorResponse): void;
}

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService implements IHttpErrorHandlerService {
  constructor(
    private toastr: ToastrService
  ) { }

  /**
   * @description
   * Handle no internet connection.
   */
  public handleNoInternetConnection(error: HttpErrorResponse): void {
    const message = 'No Internet Connection';
    this.reportError(message, error);
  }

  // TODO: use exception service that would implement this state machine
  // and can be hotswapped based on application requirements
  public handleHttpError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 400: return this.handleHttpErrorCode400(error);
      case 401: return this.handleHttpErrorCode401(error);
      case 403: return this.handleHttpErrorCode403(error);
      case 404: return this.handleHttpErrorCode404(error);
      case 422: return this.handleHttpErrorCode422(error);
      case 500: return this.handleHttpErrorCode500(error);
    }
  }

  /**
   * @description
   * Handle a 400 HTTP error.
   */
   protected handleHttpErrorCode400(error: HttpErrorResponse): void {
    const message = '400 Bad Request';
    this.reportError(message, error);
  }

  /**
   * @description
   * Handle a 401 HTTP error.
   */
  protected handleHttpErrorCode401(error: HttpErrorResponse): void {
    const message = '401 Unauthorized';
    this.reportError(message, error);
  }

  /**
   * @description
   * Handle a 403 HTTP error.
   */
  protected handleHttpErrorCode403(error: HttpErrorResponse): void {
    const message = '403 Forbidden';
    this.reportError(message, error);
  }

  /**
   * @description
   * Handle a 404 HTTP error.
   */
  protected handleHttpErrorCode404(error: HttpErrorResponse): void {
    const message = '404 Not Found';
    this.reportError(message, error);
  }

  /**
   * @description
   * Handle a 422 HTTP error.
   */
  protected handleHttpErrorCode422(error: HttpErrorResponse): void {
    const message = '422 Unprocessable Entity';
    this.reportError(message, error);
  }

  /**
   * @description
   * Handle a 500 HTTP error.
   */
  protected handleHttpErrorCode500(error: HttpErrorResponse): void {
    // const message = 'An internal server error has occurred, and has been reported. If the error continues contact us for assistance.';
    const message = '500 Internal Server Error';
    this.reportError(message, error);
  }

  /**
   * @description
   * Report the HTTP error.
   */
  protected reportError(message: string, error: HttpErrorResponse): void {
    if(error && error.error && error.error.errors){
      this.toastr.error(error.error.errors[0].msg, message);
    }
    else{
      this.toastr.error(error.error, message);
    }
  }
}
