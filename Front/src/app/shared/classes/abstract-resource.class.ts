import { HttpErrorResponse, HttpParams, HttpResponse, HttpClient } from '@angular/common/http';

import { Observable, throwError, pipe, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiHttpErrorResponse } from '../models/api-http-error-response.model';

export interface IResource {
  get<T>(
    path: string,
    params: HttpParams,
    options: { [key: string]: any }
  ): Observable<T | ApiHttpErrorResponse>;

  post<T>(
    path: string,
    body: { [key: string]: any },
    params: HttpParams,
    options: { [key: string]: any }
  ): Observable<T | ApiHttpErrorResponse>;

  put<T>(
    path: string,
    body: { [key: string]: any },
    params: HttpParams,
    options: { [key: string]: any }
  ): Observable<T | ApiHttpErrorResponse>;

  patch<T>(
    path: string,
    body: { [key: string]: any },
    params: HttpParams,
    options: { [key: string]: any }
  ): Observable<T | ApiHttpErrorResponse>;

  delete<T>(
    path: string,
    params: HttpParams,
    options: { [key: string]: any }
  ): Observable<T | ApiHttpErrorResponse>;
}

export type NoContent = Observable<void>;
export const NoContent = void 0;
export const NoContentResponse = pipe(map(() => NoContent));

// TODO add AbstractApiResource to add ApiHttpResponse to passed generic
export abstract class AbstractResource implements IResource {
  constructor(
    protected resourceEndpoint: string,
    protected http: HttpClient,
  ) { }

  public get<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    options: { [key: string]: any } = {}
  ): Observable<T | ApiHttpErrorResponse> {
    return this.http
      .get(`${this.resourceEndpoint}/${path}`, { params, observe: 'response', ...options })
      .pipe(this.handleResponse<T>());
  }

  public post<T>(
    path: string,
    body: { [key: string]: any } = {},
    params: HttpParams = new HttpParams(),
    options: { [key: string]: any } = {}
  ): Observable<T | ApiHttpErrorResponse> {
    return this.http
      .post(`${this.resourceEndpoint}/${path}`, body, { params, observe: 'response', ...options })
      .pipe(this.handleResponse<T>());
  }

  public put<T>(
    path: string,
    body: { [key: string]: any } = {},
    params: HttpParams = new HttpParams(),
    options: { [key: string]: any } = {}
  ): Observable<T | ApiHttpErrorResponse> {
    return this.http
      .put(`${this.resourceEndpoint}/${path}`, body, { params, observe: 'response', ...options })
      .pipe(this.handleResponse<T>());
  }

  public patch<T>(
    path: string,
    body: { [key: string]: any } = {},
    params: HttpParams = new HttpParams(),
    options: { [key: string]: any } = {}
  ): Observable<T | ApiHttpErrorResponse> {
    return this.http
      .patch(`${this.resourceEndpoint}/${path}`, body, { params, observe: 'response', ...options })
      .pipe(this.handleResponse<T>());
  }

  public delete<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    options: { [key: string]: any } = {}
  ): Observable<T | ApiHttpErrorResponse> {
    return this.http
      .delete(`${this.resourceEndpoint}/${path}`, { params, observe: 'response', ...options })
      .pipe(this.handleResponse<T>());
  }

  /**
   * @description
   * Handle the HTTP response.
   */
  protected handleResponse<T>() {
    return pipe(
      map(this.handleSuccess<T>()),
      catchError(this.handleError())
    );
  }

  /**
   * @description
   * Handle a successful HTTP response.
   */
  protected handleSuccess<T>(): (response: HttpResponse<T>) => T {
    return ({body }: HttpResponse<T>): T => {
      return body;
    };
  }

  /**
   * @description
   * Handle a erroneous HTTP response.
   */
  protected handleError(): (response: HttpErrorResponse) => Observable<ApiHttpErrorResponse> {
    return ({ error, status, message }: HttpErrorResponse) => {
      if (error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
      } else {
        // The backend returned an unsuccessful response code.
      }

      return throwError(new ApiHttpErrorResponse(status, error, message));
    };
  }
}
