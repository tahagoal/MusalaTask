import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { DeviceRoutingModule } from './device-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [AddComponent, ListComponent],
  imports: [
    CommonModule,
    DeviceRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class DeviceModule { }
