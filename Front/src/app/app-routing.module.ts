import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "gateway",
        loadChildren: () => import('./modules/gateway/gateway.module').then(m => m.GatewayModule)
      },
      {
        path: "device",
        loadChildren: () => import('./modules/device/device.module').then(m => m.DeviceModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
