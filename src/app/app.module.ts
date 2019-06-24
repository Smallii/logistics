import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// 引入数据双向绑定
import { FormsModule } from '@angular/forms';
// 引入请求网络支持
import { HttpClientModule } from '@angular/common/http';
// 引入本地存储
import { IonicStorageModule } from '@ionic/storage';
// 注册http拦截器
import { HttpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
    IonicModule.forRoot({backButtonText: '返回'}),
    IonicStorageModule.forRoot(
      {name: 'myApp',
        driverOrder: ['sqlite', 'indexeddb', 'websql']}),
    AppRoutingModule,
    FormsModule,
    HttpClientModule],
  providers: [
      StatusBar,
      SplashScreen,
      {
        provide: RouteReuseStrategy,
        useClass: IonicRouteStrategy
      },
      HttpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
