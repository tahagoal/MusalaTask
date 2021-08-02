import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractResource } from 'src/app/shared/classes/abstract-resource.class';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeviceApiResource extends AbstractResource {
  constructor(
    protected http: HttpClient,
  ) {
    super(environment.endpointUrl ,http);
  }
}
