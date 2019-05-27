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
  public data: any;
  public integral: any;

  public token: string;

  public integralTotal: string;
  public integralConvertibility: string;

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
    this.http.get(this.heroesUrl + '/integral_record/findAllByUserId', httpOptions)
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
   * @param event
   */
  doRefresh(event) {
    console.log('Begin async operation');
    this.findByUserId();
    this.findAllByUserId();
    event.target.complete();
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
