import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard]},
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'integral', loadChildren: './integral/integral.module#IntegralPageModule', canActivate: [AuthGuard]},
  { path: 'address', loadChildren: './address/address.module#AddressPageModule', canActivate: [AuthGuard]},
  { path: 'information', loadChildren: './information/information.module#InformationPageModule', canActivate: [AuthGuard]},
  { path: 'versioninfo', loadChildren: './versioninfo/versioninfo.module#VersioninfoPageModule', canActivate: [AuthGuard]},
  { path: 'pointsfor', loadChildren: './pointsfor/pointsfor.module#PointsforPageModule', canActivate: [AuthGuard]},
  { path: 'orderinfo/:waybillNo', loadChildren: './orderinfo/orderinfo.module#OrderinfoPageModule', canActivate: [AuthGuard]},
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule'},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
