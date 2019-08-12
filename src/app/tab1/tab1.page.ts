import {AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {ModalController, NavParams, LoadingController, ToastController, AlertController, IonSlides} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit  {

  @ViewChild(IonSlides) slides: IonSlides;

  slideOpts = {
    effect: 'flip',  // 轮播效果
    autoplay: {
      delay: 2000,
    },
    loop: true
  };

  public token: string;
  public result: any;

  constructor(
      private http: HttpClient,
      public loadingController: LoadingController,
      public toastController: ToastController,
      public alertController: AlertController
  ) {
    console.log('aaaaaa');
  }

  ngAfterViewInit() {
    console.log('xxxxx');
  }

  // ngOnInit() {
  //   console.log('111111');
  //   // const mySwiper = new Swiper('.swiper-container', {
  //   //     //   loop : true, // 图片首尾相接
  //   //     //   touchRatio : 2, // 触摸变慢或者变快
  //   //     //   autoplay: {
  //   //     //     delay: 3000,
  //   //     //     stopOnLastSlide: false,
  //   //     //     disableOnInteraction: false, // 如果设置为false，用户操作swiper之后自动切换不会停止
  //   //     //   },
  //   //     // });
  // }

  ionViewWillEnter() {
    console.log('aaaaaa');
  }
  /**
   * 每次进入页面都触发
   */
  ionViewDidEnter() {
    console.log('进入页面');
    this.slides.startAutoplay();
  }

  /**
   * 页面离开时触发
   */
  ionViewDidLeave() {
    console.log('离开页面');
    this.slides.stopAutoplay();
  }

  // 手动滑动后轮播图不自动轮播的解决方法
  slideDidChange() {
    this.slides.stopAutoplay();
    this.slides.startAutoplay();
    // this.slide1.startAutoplay();
  }

  /**
   * 下拉刷新，解决账户token无效或者因为过期而导致的货物类型无法获取
   */
  doRefresh(event) {
    console.log('重新获取数据');
    this.slides.stopAutoplay();
    this.slides.startAutoplay();
    event.target.complete();
  }

  /**
   * 获取轮播图集合
   */
  async findAllBanner() {
    this.http.get('/cargo_type/findAllCargoType')
        .subscribe((data) => {
          console.log('成功');
          this.result = data;
        }, response => {
          this.presentToast('服务器出错啦！');
        }, () => {
          // loading.dismiss();
          // this.presentToast('请求超时');
        });
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
