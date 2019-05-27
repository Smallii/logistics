import {Component, ViewChild, OnInit } from '@angular/core';

import {LoadingController, ToastController, IonInfiniteScroll} from '@ionic/angular';
// 加载Http请求模块
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private heroesUrl = 'http://10.64.3.31:8099';  // URL to web api
  public simulationArray: any;
  public data: any;
  public items: any;
  public type: string;
  constructor(private http: HttpClient,
              public loadingController: LoadingController,
              public toastController: ToastController) {
    this.items = [
      {title: 'item1', name: 'item1'},
      {title: 'item2', name: 'item2'},
      {title: 'item3', name: 'item3'},
      {title: 'item4', name: 'item4'},
      {title: 'item5', name: 'item5'},
      {title: 'item6', name: 'item6'}
    ];

    // this.getData();
    // componentProps can also be accessed at construction time using NavParams
  }

  ngOnInit() {
    console.log('订单');
  }

  removeItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.items.splice(i, 1);
      }
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (this.data.length === 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  segmentChanged(ev: any) {
    console.log('点击tab页：', ev.detail.value);
    this.type = ev.detail.value;
    this.getWaybillList();
  }

  /**
   * 获取用户订单
   */
  async getWaybillList() {
    const loading = await this.loadingController.create({
      message: '获取数据...'
    });
    // this.storage.get('token').then((token) => {
    //     localStorage.setItem('token', token);
    // });
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') })
    };
    await loading.present();
    this.http.get(this.heroesUrl + '/waybill/findAllByWaybillStateAndUserId?waybillState=' + this.type, httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.data = data;
          this.data = this.data.data;
          loading.dismiss();
        }, response => {
          loading.dismiss();
          // console.log('失败');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
  }

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      duration: 2000
    });
    toast.present();
  }
}
