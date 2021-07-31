import { NgModule } from '@angular/core';
import { GatewayRoutingModule } from './gateway-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
  AddComponent,
  ListComponent],
  imports: [
    GatewayRoutingModule
  ],
})
export class GatewayModule { }
