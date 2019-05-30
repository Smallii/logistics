import {Component, OnInit} from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  public token: string;
  private heroesUrl = 'http://10.64.3.31:8099';  // URL to web api
  public result: any;

  waybill: any = {
    waybillCargoName: '',
    waybillTransportWay: '1',
    cargoTypeId: 1,
    waybillGoodsName: '',
    waybillGoodsPhone: '',
    waybillGoodsAddress: '',
    waybillShipperName: '',
    waybillShipperPhone: '',
    waybillShipperAddress: '',
    waybillEstimatedWeight: ''
  };

  CargoType: any = [];

  isTrue: string;

  constructor(
      private http: HttpClient,
      public loadingController: LoadingController,
      public toastController: ToastController
  ) {
  }

  ngOnInit() {
    console.log('首页');
    this.findAllCargoType();
  }

  // this.token = localStorage.getItem('token');

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  /**
   * 获取货物类别
   */
  async findAllCargoType() {
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
    this.http.get(this.heroesUrl + '/cargo_type/findAllCargoType', httpOptions)
        .subscribe((data) => {
          console.log('成功');
          this.result = data;
          if (403 === this.result.meta.status) {
              this.presentToast('登录超时，请重新登录！');
              loading.dismiss();
              return false;
          }
          this.CargoType = this.result.data;
          loading.dismiss();
        }, response => {
          loading.dismiss();
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
  }

  /**
   * 提交订单
   */
  async addOrder() {
    const loading = await this.loadingController.create({
      message: '订单提交中...'
    });
    this.token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': this.token })
    };
    await loading.present();
    this.http.post(this.heroesUrl + '/waybill/addWaybill', this.waybill, httpOptions)
        .subscribe((data) => {
              this.result = data;
              if ('200' === this.result.code) {
                loading.dismiss();
                this.presentToast(this.result.msg);
              } else {
                loading.dismiss();
                this.presentToast('注册失败');
              }
              console.log(data);
            },
            response => {
              loading.dismiss();
              console.log(response);
              this.presentToast(response);
            },
            () => {
              loading.dismiss();
              console.log('The POST observable is now completed.');
            }
        );
  }

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      // position: 'top',
      duration: 2000
    });
    toast.present();
  }
}
