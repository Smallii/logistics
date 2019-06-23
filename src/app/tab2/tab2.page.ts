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
  private heroesUrl = 'http://192.168.1.105:8099';  // URL to web api
    // private heroesUrl = 'http://127.0.0.1:8099';  // URL to web api
  public simulationArray: any;
  public result: any;
  public resultStart: any;
  public data: any;
  public items: any;
  public type: string;
  public currentPage = 0;
  public pageSize = 10;
  public totalPages = 0;
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

    /**
     * 取消订单
     */
    async cancelOrder(item) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === item) {
                console.log(item.waybillId);
                const loading = await this.loadingController.create({
                    message: '提交申请中...'
                });
                const httpOptions = {
                    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') })
                };
                const data1 = {
                    'waybillId': item.waybillId,
                    'waybillState': '5'
                };
                await loading.present();
                this.http.post(this.heroesUrl + '/waybill/cancelWaybill', data1, httpOptions)
                    .subscribe((data) => {
                            this.resultStart = data;
                            if ('200' === this.resultStart.code) {
                                loading.dismiss();
                                this.presentToast(this.resultStart.msg);
                                this.data.splice(i, 1);
                            } else {
                                loading.dismiss();
                                this.presentToast(this.resultStart.msg);
                            }
                        },
                        response => {
                            loading.dismiss();
                            console.log(response);
                            this.presentToast('服务器出错啦！');
                        },
                        () => {
                            loading.dismiss();
                            console.log('The POST observable is now completed.');
                        }
                    );
            }
        }
    }

  removeItem(item) {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] === item) {
          console.log(item.waybillId);
          this.data.splice(i, 1);
      }
    }
  }

  /**
   * 下拉刷新
   */
  doRefresh(event) {
    console.log('Begin async operation');
    this.currentPage = 0;
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') })
    };
    this.http.get(this.heroesUrl + '/waybill/findAll?waybillState=' + this.type + '&currentPage=' + this.currentPage + '&pageSize=' + this.pageSize, httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.data = data;
          this.data = this.data.data.content;
        }, response => {
          // console.log('失败');
        }, () => {
            this.presentToast('服务器出错啦！');
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
    this.toggleInfiniteScroll();
    event.target.complete();
  }

  /**
   * 上拉加载
   */
  loadData(event) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') })
    };
    this.currentPage ++;
    this.http.get(this.heroesUrl + '/waybill/findAll?waybillState=' + this.type + '&currentPage=' + this.currentPage + '&pageSize=' + this.pageSize, httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.result = data;
          this.totalPages = this.result.data.totalPages;
          event.target.complete();
          this.data = this.data.concat(this.result.data.content);
          if (this.currentPage === this.totalPages - 1) {
            event.target.disabled = true;
          }
        }, response => {
            this.presentToast('服务器出错啦！');
          // console.log('失败');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = false;
  }

  segmentChanged(ev: any) {
    console.log('点击tab页：', ev.detail.value);
      this.currentPage = 0;
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
    const page = {
        waybillState: this.type,
        currentPage: this.currentPage,
        pageSize: this.pageSize
    };
    this.http.get(this.heroesUrl + '/waybill/findAll?waybillState=' + this.type + '&currentPage=' + this.currentPage + '&pageSize=' + this.pageSize, httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.data = data;
          this.data = this.data.data.content;
          loading.dismiss();
        }, response => {
          loading.dismiss();
            this.presentToast('服务器出错啦！');
          // console.log('失败');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
  }

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
        position: 'middle',
        duration: 3000
    });
    toast.present();
  }
}
