import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-orderinfo',
  templateUrl: './orderinfo.page.html',
  styleUrls: ['./orderinfo.page.scss'],
})
export class OrderinfoPage implements OnInit {
  public data: any;
  public result: any;
  CargoType: any = [];
  waybill: any = {
    waybillNo: '',
    waybillPayWay: '',
    waybillCargoName: '',
    waybillTransportWay: '',
    cargoTypeId: 0,
    waybillState: '',
    creationTime: '',
    waybillGoodsName: '',
    waybillGoodsPhone: '',
    waybillGoodsAddress: '',
    waybillShipperName: '',
    waybillShipperPhone: '',
    waybillShipperAddress: '',
    waybillEstimatedWeight: '',
    waybillPayment: '',
    waybillMoney: ''
  };

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      public loadingController: LoadingController,
      public toastController: ToastController,
      private http: HttpClient
  ) { }

  ngOnInit() {
    this.getWaybillInfo();
    const id = this.route.snapshot.paramMap.get('waybillNo');
    console.log(id);
  }

  /**
   * 下拉刷新
   */
  doRefresh(event) {
    console.log('Begin async operation');
    this.getWaybillInfo();
    event.target.complete();
  }

  /**
   * 获取运单详细信息
   */
  async getWaybillInfo() {
    const loading = await this.loadingController.create({
    });
    const id = this.route.snapshot.paramMap.get('waybillNo');
    await loading.present();
    this.http.get('/waybill/findByWaybillNo?waybillNo=' + id)
        .subscribe((data) => {
          console.log('成功', data);
          this.data = data;
          this.waybill = this.data.data;
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

  goRoot() {
    this.router.navigate(['/tabs/tab2']);
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
