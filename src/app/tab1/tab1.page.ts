import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams, LoadingController, ToastController, AlertController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  public token: string;
  private heroesUrl = 'http://192.168.1.105:8099';  // URL to web api
  // private heroesUrl = 'http://127.0.0.1:8099';  // URL to web api
  public result: any;

  waybill: any = {
    waybillCargoName: '',
    waybillTransportWay: '1',
    cargoTypeId: '',
    waybillGoodsName: '',
    waybillGoodsPhone: '',
    waybillGoodsAddress: '',
    waybillShipperName: '',
    waybillShipperPhone: '',
    waybillShipperAddress: '',
    waybillEstimatedWeight: '',
    userAttribute: '2',
    waybillPayment: '1'
  };

  CargoType: any = [];

  isTrue: string;

  constructor(
      private http: HttpClient,
      public loadingController: LoadingController,
      public toastController: ToastController,
      public alertController: AlertController
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

  onSubmit() {

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
          this.CargoType = this.result.data;
          loading.dismiss();
        }, response => {
          loading.dismiss();
          this.presentToast('服务器出错啦！');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
  }

  /**
   * 提交订单
   */
  async addOrder() {
    /**
     * 表单验证
     */
    if ('' === this.waybill.cargoTypeId) {
      this.presentAlert('请选择一种货物类别！');
      return false;
    }
    if ('' === this.waybill.waybillCargoName.trim()) {
      this.presentAlert('请输入货物名称！');
      return false;
    }
    if (this.waybill.waybillCargoName.length >= 100) {
      this.presentAlert('货物名称过长！');
      return false;
    }
    if ('' === this.waybill.waybillEstimatedWeight.trim()) {
      this.presentAlert('请输入货物预计重量！');
      return false;
    }
    const waybillEstimatedWeightVal = /^[0-9]+$/;
    if (!waybillEstimatedWeightVal.test(this.waybill.waybillEstimatedWeight)) {
      this.presentAlert('货物预计重量格式不正确！');
      return false;
    }
    if ('' === this.waybill.waybillShipperName.trim()) {
      this.presentAlert('请输入发货人姓名！');
      return false;
    }
    if (this.waybill.waybillShipperName.length >= 50) {
      this.presentAlert('发货人姓名过长！');
      return false;
    }
    if ('' === this.waybill.waybillShipperPhone.trim()) {
      this.presentAlert('请输入发货人手机号！');
      return false;
    }
    const waybillShipperPhoneVal = /^[1][3458][012356789][0-9]+$/;
    if (!waybillShipperPhoneVal.test(this.waybill.waybillShipperPhone)) {
      this.presentAlert('发货人手机号格式不正确！');
      return false;
    }
    if ('' === this.waybill.waybillShipperAddress.trim()) {
      this.presentAlert('请输入发货人地址！');
      return false;
    }
    if (this.waybill.waybillShipperAddress.length >= 100) {
      this.presentAlert('发货人地址过长！');
      return false;
    }
    if ('' === this.waybill.waybillGoodsName.trim()) {
      this.presentAlert('请输入收货人姓名！');
      return false;
    }
    if (this.waybill.waybillGoodsName.length >= 50) {
      this.presentAlert('收货人姓名过长！');
      return false;
    }
    if ('' === this.waybill.waybillGoodsPhone.trim()) {
      this.presentAlert('请输入收货人手机号！');
      return false;
    }
    const waybillGoodsPhoneVal = /^[1][3458][012356789][0-9]+$/;
    if (!waybillGoodsPhoneVal.test(this.waybill.waybillGoodsPhone)) {
      this.presentAlert('收货人手机号格式不正确！');
      return false;
    }
    if ('' === this.waybill.waybillGoodsAddress.trim()) {
      this.presentAlert('请输入收货人地址！');
      return false;
    }
    if (this.waybill.waybillGoodsAddress.length >= 200) {
      this.presentAlert('收货人地址过长！');
      return false;
    }
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
              this.presentToast('服务器出错啦！');
            },
            () => {
              loading.dismiss();
              console.log('The POST observable is now completed.');
            }
        );
  }

  /**
   * 吐司
   */
  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      // position: 'top',
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  /**
   * alert
   */
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: '提示！',
      message: msg,
      buttons: ['好的']
    });
    alert.present();
  }
}
