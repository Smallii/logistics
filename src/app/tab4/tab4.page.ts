import {Component, OnInit} from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

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
      public alertController: AlertController,
      private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.monicker = localStorage.getItem('monicker');
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
