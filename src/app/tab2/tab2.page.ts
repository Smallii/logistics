import { Component } from '@angular/core';

import {LoadingController, ToastController} from '@ionic/angular';
// 加载Http请求模块
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  private heroesUrl = 'http://10.64.3.31:80/sys/user/list';  // URL to web api
  public simulationArray: any;
  constructor(private http: HttpClient,
              public loadingController: LoadingController,
              public toastController: ToastController) {
    this.getData();
    // componentProps can also be accessed at construction time using NavParams
  }

  async getData() {
    console.log('发送GET请求');
    const loading = await this.loadingController.create({
      message: '获取数据...'
    });
    await loading.present();
    this.http.get(this.heroesUrl)
        .subscribe(data => {
          this.simulationArray = data;
          loading.dismiss();
          this.presentToast('获取数据成功');
        });
        // , function (error) {
        //   this.presentToast('获取数据成功');
        //   loading.dismiss();
        //   alert('失败');
        // });
  }

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      duration: 2000
    });
    toast.present();
  }
}
