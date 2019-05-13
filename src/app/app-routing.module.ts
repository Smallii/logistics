import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'integral', loadChildren: './integral/integral.module#IntegralPageModule' },
  { path: 'address', loadChildren: './address/address.module#AddressPageModule' },
  { path: 'information', loadChildren: './information/information.module#InformationPageModule' },
  { path: 'versioninfo', loadChildren: './versioninfo/versioninfo.module#VersioninfoPageModule' },
  { path: 'pointsfor', loadChildren: './pointsfor/pointsfor.module#PointsforPageModule' },
  { path: 'orderinfo', loadChildren: './orderinfo/orderinfo.module#OrderinfoPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
