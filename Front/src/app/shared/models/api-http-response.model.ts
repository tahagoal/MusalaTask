import { HttpHeaders } from '@angular/common/http';

export class ApiHttpResponse<T> {
  readonly status: number;
  readonly headers: HttpHeaders;
  readonly results: T;
  readonly message?: string;

  constructor(status: number, headers: HttpHeaders, result: T, message?: string) {
    this.status = status;
    this.headers = headers;
    this.results = result;
    this.message = message;
  }
}