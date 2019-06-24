import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public token: string;
  constructor(
      private router: Router,
      public nav: NavController) {
  }

  /**
   * 跳转到登录页面
   */
  goLogin() {
    this.nav.navigateRoot(['/login']);
    // this.router.navigate(['/login']);
  }

  /**
   * 打开登录模态窗
   */
  // async openLogin() {
  //   console.log('打开登录页模态框');
  //   const value = '张三';
  //   const value2 = '20';
  //   const modal = await this.modalController.create({
  //     component: LoginPage,
  //     componentProps: {
  //       'prop1': value,
  //       'prop2': value2
  //     }
  //   });
  //   await modal.present();
  //   // 监听销毁的事件
  //   const { data } = await modal.onDidDismiss();
  //   console.log(data.result);
  //   if (data.result !== 'success') {
  //     this.openRegister();
  //   }
  // }

  /**
   * 打开注册模态窗
   */
  // async openRegister() {
  //   console.log('打开注册页模态框');
  //   const value = '张三';
  //   const value2 = '20';
  //   const modal = await this.modalController.create({
  //     component: RegisterPage,
  //     componentProps: {
  //       'prop1': value,
  //       'prop2': value2
  //     }
  //   });
  //   await modal.present();
  //   // 监听销毁的事件
  //   const { data } = await modal.onDidDismiss();
  //   console.log(data.result);
  //   this.openLogin();
  // }
}
