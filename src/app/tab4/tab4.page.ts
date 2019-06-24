import {Component, OnInit} from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
// 加载本地存储模块
import { Storage } from '@ionic/storage';

import { LoginPage } from '../login/login.page';
import {RegisterPage} from '../register/register.page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  public token: string;
  public username: string;
  private monicker: string;
  items = [
    {title: 'item1', name: 'item1'},
    {title: 'item2', name: 'item2'},
    {title: 'item3', name: 'item3'},
    {title: 'item4', name: 'item4'},
    {title: 'item5', name: 'item5'},
    {title: 'item6', name: 'item6'}
  ];
  constructor(
      public modalController: ModalController,
      public alertController: AlertController,
      private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.monicker = localStorage.getItem('monicker');
  }

  /**
   * 打开登录模态窗
   */
  async openLogin() {
    console.log('打开登录页模态框');
    const value = '张三';
    const value2 = '20';
    const modal = await this.modalController.create({
      component: LoginPage,
      componentProps: {
        'prop1': value,
        'prop2': value2
      }
    });
    await modal.present();
    // 监听销毁的事件
    const { data } = await modal.onDidDismiss();
    console.log(data.result);
    if (data.result !== 'success') {
      this.openRegister();
    } else {
      this.username = localStorage.getItem('username');
    }
  }

  /**
   * 打开注册模态窗
   */
  async openRegister() {
    console.log('打开注册页模态框');
    const value = '张三';
    const value2 = '20';
    const modal = await this.modalController.create({
      component: RegisterPage,
      componentProps: {
        'prop1': value,
        'prop2': value2
      }
    });
    await modal.present();
    // 监听销毁的事件
    const { data } = await modal.onDidDismiss();
    console.log(data.result);
    this.openLogin();
  }

  /**
   * 注销登录
   */
  async logout() {
    // 移除localStorage中存储的token信息
    localStorage.removeItem('token');
    // 移除Storage中存储的token信息
    // this.storage.remove('token');
    // 打开登录模态窗
    this.router.navigate(['/login']);
  }

  /**
   * 询问是否退出登录
   */
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '提示！',
      message: '<strong>确定退出登录吗</strong>?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: '确定',
          handler: () => {
            console.log('Confirm Okay');
            this.logout();
          }
        }
      ]
    });
    await alert.present();
  }
}
