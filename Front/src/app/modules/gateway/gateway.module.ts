import { NgModule } from '@angular/core';
import { GatewayRoutingModule } from './gateway-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
  AddComponent,
  ListComponent],
  imports: [
    GatewayRoutingModule,
    TranslateModule,
    CommonModule,
    ReactiveFormsModule
  ],
})
export class GatewayModule { }
