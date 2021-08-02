import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeviceService } from 'src/app/core/services/device.service';
import { GatewayService } from 'src/app/core/services/gateway.service';
import { Status } from 'src/app/shared/enums/status.enum';
import { Device } from 'src/app/shared/models/device.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup;
  private gatewayId: string;

  constructor(
    private fb: FormBuilder,
    private gatewayservice: GatewayService,
    private service: DeviceService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.createFormInstance();
    this.route.params.subscribe(params => {
      this.gatewayId = params.gatewayId;
      this.getGateway();
    })
  }

  private createFormInstance(): void {
    this.form = this.fb.group({
      uid: [Math.floor(Math.random()*90000) + 10000, [Validators.required]],
      vendor: [null, [Validators.required]],
      status:[Status.ONLINE, [Validators.required]]
    });
  }

  public save(){
    let device: Device;
    device = this.form.value;
    device.gatewayId = this.gatewayId;
    this.service.createDevice(device).subscribe((res) => {
      this.toast.success('Device Created Successfully', 'Success');
      this.router.navigate(['gateway/list'])
    })
  }

  private getGateway(){
    this.gatewayservice.getGatewayById(this.gatewayId).subscribe((res) => {
    })
  }

  public backtoList(){
    this.router.navigate(['gateway/list'])
  }
}
