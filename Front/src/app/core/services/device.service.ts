import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, exhaustMap } from 'rxjs/operators';
import { Device } from 'src/app/shared/models/device.model';
import { DeviceApiResource } from '../resources/device-resource.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(
    private gateApiResourse: DeviceApiResource
  ) { }

  public getAllDevices(gatewayId): Observable<Device[]> {

    const params = new HttpParams();
    return this.gateApiResourse.get<Device[]>(`devices/${gatewayId}`, params)
      .pipe(
        exhaustMap((response: Device[]) =>
          of(response)
        ),
        catchError((error: any) => throwError(error))
      );
  }

  public createDevice(device:Device): Observable<Device> {

    return this.gateApiResourse.post<Device>('devices', device)
      .pipe(
        exhaustMap((response: Device) =>
          of(response)
        ),
        catchError((error: any) => throwError(error))
      );
  }

  public deleteDevice(deviceId: string): Observable<Device> {

    const params = new HttpParams();
    return this.gateApiResourse.delete<Device>(`devices/${deviceId}`, params )
      .pipe(
        exhaustMap((response: Device) =>
          of(response)
        ),
        catchError((error: any) => throwError(error))
      );
  }

}
