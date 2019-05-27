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

  private heroesUrl = 'http://10.64.3.31:8099';  // URL to web api
  public data: any;
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
    waybillEstimatedWeight: ''
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
   * 获取运单详细信息
   */
  async getWaybillInfo() {
    const loading = await this.loadingController.create({
      message: '获取数据...'
    });
    // this.storage.get('token').then((token) => {
    //     localStorage.setItem('token', token);
    // });
    const id = this.route.snapshot.paramMap.get('waybillNo');
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': localStorage.getItem('token') })
    };
    await loading.present();
    this.http.get(this.heroesUrl + '/waybill/findByWaybillNo?waybillNo=' + id, httpOptions)
        .subscribe((data) => {
          console.log('成功', data);
          this.data = data;
          this.waybill = this.data.data;
          loading.dismiss();
        }, response => {
          loading.dismiss();
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
      duration: 2000
    });
    toast.present();
  }

}
