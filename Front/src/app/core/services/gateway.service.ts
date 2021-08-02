import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, exhaustMap } from 'rxjs/operators';
import { GateWay } from 'src/app/shared/models/gateway.model';
import { GatewayApiResource } from '../resources/gateway-resource.service';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor(
    private gateApiResourse: GatewayApiResource
  ) { }

  public getAllGateways(): Observable<GateWay[]> {

    const params = new HttpParams();
    return this.gateApiResourse.get<GateWay[]>('gateways', params)
      .pipe(
        exhaustMap((response: GateWay[]) =>
          of(response)
        ),
        catchError((error: any) => throwError(error))
      );
  }

  public createGateway(gateway:GateWay): Observable<GateWay> {

    return this.gateApiResourse.post<GateWay>('gateways', gateway)
      .pipe(
        exhaustMap((response: GateWay) =>
          of(response)
        ),
        catchError((error: any) => throwError(error))
      );
  }

  public getGatewayById(gatewayId: string): Observable<GateWay> {

    return this.gateApiResourse.get<GateWay>(`gateways/${gatewayId}`)
      .pipe(
        exhaustMap((response: GateWay) =>
          of(response)
        ),
        catchError((error: any) => throwError(error))
      );
  }

}
