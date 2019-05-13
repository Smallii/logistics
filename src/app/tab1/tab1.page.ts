import { Component } from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isTrue: string;

  constructor(
      public toastController: ToastController
  ) {
    this.chType();
  }

  /**
   * 选择运输方式
   */
  transportWayActionSheetOptions: any = {
    header: '选择运输方式',
    subHeader: '默认为物流'
  };

  /**
   * 选择货物类别
   */
  cargoCategoryActionSheetOptions: any = {
    header: '选择货物类别'
  };

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async chType() {
    this.isTrue = '1';
  }

  async addOrder() {
    // this.getData();
    // console.log('接收本页面的输入值：', this.prop1, this.prop2);
    this.presentToast('提交成功');
  }

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
