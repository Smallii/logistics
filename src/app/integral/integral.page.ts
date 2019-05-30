import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {IonInfiniteScroll, LoadingController, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-integral',
  templateUrl: './integral.page.html',
  styleUrls: ['./integral.page.scss'],
})
export class IntegralPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private heroesUrl = 'http://127.0.0.1:8099';  // URL to web api
  public simulationArray: any;
  public data: any = [];
  public data2: any;
  public result: any;
  public integral: any;

  public token: string;

  public integralTotal: string;
  public integralConvertibility: string;
  public currentPage = 0;
  public pageSize = 10;
  public totalPages = 0;
  public first;

  public items: any;
  constructor(
      private router: Router,
      private http: HttpClient,
      public loadingController: LoadingController,
      public toastController: ToastController
  ) {
    this.items = [
      {title: 'item1', name: 'item1'},
      {title: 'item2', name: 'item2'},
      {title: 'item3', name: 'item3'},
      {title: 'item4', name: 'item4'},
      {title: 'item5', name: 'item5'},
      {title: 'item6', name: 'item6'}
    ];
  }

  ngOnInit() {
    this.findByUserId();
    this.findAllByUserId();
  }

  /**
   * 获取积分记录集合
   */
  async findAllByUserId() {
    const loading = await this.loadingController.create({
      message: '获取数据...'
    });
    // this.storage.get('token').then((token) => {
    //     localStorage.setItem('token', token);
    // });
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.token })
    };
    await loading.present();
    this.http.get(this.heroesUrl + '/integral_record/findAllByUserId?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize , httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.data = data;
          this.data = this.data.data.content;
          this.result = data;
          this.totalPages = this.result.data.totalPages;
          this.first = this.result.data.first;
          loading.dismiss();
        }, response => {
          loading.dismiss();
          // console.log('失败');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
  }

  /**
   * 获取总积分
   */
  async findByUserId() {
    const loading = await this.loadingController.create({
      message: '获取数据...'
    });
    // this.storage.get('token').then((token) => {
    //     localStorage.setItem('token', token);
    // });
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.token })
    };
    await loading.present();
    this.http.get(this.heroesUrl + '/integral/findAllByUserId', httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.integral = data;
          this.integralTotal = this.integral.data.integralTotal;
          this.integralConvertibility = this.integral.data.integralConvertibility;
          loading.dismiss();
        }, response => {
          loading.dismiss();
          // console.log('失败');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
  }

  removeItem(item) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] === item) {
        this.items.splice(i, 1);
      }
    }
  }

  /**
   * 下拉刷新
   */
  doRefresh(event) {
    console.log('Begin async operation');
    this.currentPage = 0;
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.token })
    };
    this.http.get(this.heroesUrl + '/integral/findAllByUserId', httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.integral = data;
          this.integralTotal = this.integral.data.integralTotal;
          this.integralConvertibility = this.integral.data.integralConvertibility;
        }, response => {
          // console.log('失败');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
    this.http.get(this.heroesUrl + '/integral_record/findAllByUserId?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize , httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
            this.data = data;
            this.data = this.data.data.content;
          this.result = data;
          this.totalPages = this.result.data.totalPages;
          this.first = this.result.data.first;
        }, response => {
          // console.log('失败');
        }, () => {
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
    console.log(event);
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.token })
    };
    this.currentPage ++;
    this.http.get(this.heroesUrl + '/integral_record/findAllByUserId?currentPage=' + this.currentPage + '&pageSize=' + this.pageSize , httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.data2 = data;
          this.data2 = this.data2.data.content;
          this.result = data;
          this.totalPages = this.result.data.totalPages;
          event.target.complete();
          this.data = this.data.concat(this.data2);
          if (this.currentPage === this.totalPages - 1) {
            event.target.disabled = true;
          }
        }, response => {
          // console.log('失败');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
    // event.target.complete();
    // setTimeout(() => {
    //   console.log('Done');
    //   event.target.complete();
    //   // App logic to determine if all data is loaded
    //   // and disable the infinite scroll
    //   // if (this.data.length === 1000) {
    //   //   event.target.disabled = true;
    //   // }
    // }, 500);
  }

  /**
   * 恢复页面的上拉加载控件
   */
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = false;
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      duration: 2000
    });
    toast.present();
  }

  goRoot() {
    this.router.navigate(['/tabs/tab4']);
  }

}
