import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams, LoadingController, ToastController, AlertController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {

  @ViewChild('slide1') slide1;

  slideOpts = {
    effect: 'flip',  // 轮播效果
    autoplay: {
      delay: 2000,
    },
    loop: true
  };

  public token: string;
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

  // 手动滑动后轮播图不自动轮播的解决方法
  slideDidChange() {
    console.log('111');
    this.slide1.startAutoplay();
  }

  /**
   * 下拉刷新，解决账户token无效或者因为过期而导致的货物类型无法获取
   */
  doRefresh(event) {
    console.log('获取货物类型');
    this.findAllCargoType();
    event.target.complete();
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
    });
    await loading.present();
    this.http.get('/cargo_type/findAllCargoType')
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
    const waybillShipperPhoneVal = /^[1][3,4,5,7,8][0-9]{9}$/;
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
    const waybillGoodsPhoneVal = /^[1][3,4,5,7,8][0-9]{9}$/;
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
    this.http.post('/waybill/addWaybill', this.waybill)
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
