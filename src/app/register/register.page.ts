import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // 页面输入的数值
  @Input() userName: string;
  @Input() userPwd: string;

  private heroesUrl = 'http://192.168.1.105:8099';
  // private heroesUrl = 'http://127.0.0.1:8099';  // URL to web api

  public result: any;

  user: any = {
    username: '',
    password: '',
    userType: '2'
  };

  constructor(
      public toastController: ToastController,
      private http: HttpClient,
      public loadingController: LoadingController,
      private router: Router,
      public modalController: ModalController,
      public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  /**
   * 关闭模态窗
   */
  async closeRegister() {
    // this.getData();
    // console.log('接收本页面的输入值：', this.prop1, this.prop2);
    this.modalController.dismiss({
      result: 'register'
    });
  }

  /**
   * 注册用户
   */
  async register() {
    /**
     * 验证用户名
     */
    if ('' === this.user.username || null === this.user.username || undefined === this.user.username) {
      this.presentAlert('用户名不能为空！');
      return false;
    }
    const usernameVal = /^[1][3458][012356789][0-9]+$/;
    if (!usernameVal.test(this.user.username)) {
      this.presentAlert('用户名格式不正确！');
      return false;
    }
    if ('' === this.user.password || null === this.user.password || undefined === this.user.password) {
      this.presentAlert('密码不能为空！');
      return false;
    }
    const passwordVal = /^[a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+|[A-Z]+[0-9]+[a-z]+|[A-Z]+[a-z]+[0-9]+$/;
    if (!passwordVal.test(this.user.password)) {
      this.presentAlert('密码格式不正确！');
      return false;
    }
    const loading = await this.loadingController.create({
      message: '注册中...'
    });
    await loading.present();
    this.http.post(this.heroesUrl + '/user/register', this.user)
        .subscribe((data) => {
          this.result = data;
          if ('301' === this.result.code) {
            loading.dismiss();
            this.presentToast(this.result.msg);
          }
          if ('200' === this.result.code) {
            loading.dismiss();
            this.presentToast(this.result.msg);
            this.closeRegister();
          } else {
            loading.dismiss();
            this.presentToast('注册失败');
          }
          console.log(data);
        },
        response => {
          loading.dismiss();
          this.presentToast(response.error.meta.message);
        },
        () => {
          loading.dismiss();
          console.log('The POST observable is now completed.');
        });
  }

  /**
   * 跳转到登录页面
   */
  goLogin() {
    this.router.navigate(['/login']);
  }

  /**
   * 吐司方法
   * @param content
   */
  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
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
    await alert.present();
  }

}
