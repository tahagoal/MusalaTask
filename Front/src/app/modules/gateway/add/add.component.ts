import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GatewayService } from 'src/app/core/services/gateway.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: GatewayService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createFormInstance();
  }

  private createFormInstance(): void {
    this.form = this.fb.group({
      serial: [null, [Validators.required]],
      name: [null, [Validators.required]],
      IP:[null, [Validators.required, Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")]]
    });
  }

  public save(){
    this.service.createGateway(this.form.value).subscribe((res) => {
      this.toast.success('Gateway Created Successfully', 'Success');
    })
  }

  public backtoList(){
    this.router.navigate(['gateway/list'])
  }

}
