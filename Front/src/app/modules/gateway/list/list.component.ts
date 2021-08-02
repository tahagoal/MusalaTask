import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { GateWay } from 'src/app/shared/models/gateway.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  gateways: GateWay[];

  constructor(
    private gatewayservice: GatewayService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllGateways();
  }

  getAllGateways(){
    this.gatewayservice.getAllGateways().subscribe((res: GateWay[]) => {
      this.gateways = res;
    })
  }

  gotoDevices(gatewayId: string){
    this.router.navigate(['device/list', gatewayId]);
  }

  addDevice(gatewayId: string){
    this.router.navigate(['device/add', gatewayId]);
  }

  addGateway(){
    this.router.navigate(['gateway/add']);
  }

}
