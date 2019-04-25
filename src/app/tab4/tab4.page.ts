import {Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  constructor(public modalController: ModalController) {
    console.log('用户为空，跳转到登录模态框');
    const user = '';
    if ('' === user) {
      this.presentModal();
    }
  }

  // 打开一个模态框，向打开的模态框中传入prop1和prop2两个参数
  async presentModal() {
    console.log('打开登录页或者注册页模态框');
    const value = '张三';
    const value2 = '20';
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: {
        'prop1': value,
        'prop2': value2
      }
    });
    return await modal.present();
  }
}
