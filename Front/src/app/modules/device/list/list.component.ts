import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from 'src/app/core/services/device.service';
import { Device } from 'src/app/shared/models/device.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  devices: Device[] = [];
  gatewayId: string;

  constructor(
    private deviceservice: DeviceService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gatewayId = params.gatewayId;
      this.getAllDevices();
    })
  }

  getAllDevices() {
    this.deviceservice.getAllDevices(this.gatewayId).subscribe((res: Device[]) => {
      this.devices = res;
    })
  }

  deleteDevice(deviceId) {
    this.deviceservice.deleteDevice(deviceId).subscribe((res) => {
      this.toast.success('Device deleted successfully', 'Success');
      this.getAllDevices();
    })
  }

  addDevice(){
    this.router.navigate(['device/add', this.gatewayId]);
  }

}
