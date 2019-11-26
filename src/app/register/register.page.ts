import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
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

  public result: any;

  user: any = {
    username: '',
    password: '',
    monicker: '',
    userType: '2'
  };

  constructor(
      public toastController: ToastController,
      private http: HttpClient,
      public loadingController: LoadingController,
      private router: Router,
      public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  /**
   * 关闭模态窗
   */
  // async closeRegister() {
  //   // this.getData();
  //   // console.log('接收本页面的输入值：', this.prop1, this.prop2);
  //   this.modalController.dismiss({
  //     result: 'register'
  //   });
  // }

  /**
   * 注册用户
   */
  async register() {
    /**
     * 验证用户名
     */
    if ('' === this.user.username.trim() || null === this.user.username.trim() || undefined === this.user.username.trim()) {
      this.presentAlert('手机号不能为空！');
      return false;
    }
    const usernameVal = /^[1][3456789][012356789][0-9]+$/;
    if (!usernameVal.test(this.user.username.trim())) {
      this.presentAlert('手机号格式不正确！');
      return false;
    }
    if ('' === this.user.password.trim() || null === this.user.password.trim() || undefined === this.user.password.trim()) {
      this.presentAlert('密码不能为空！');
      return false;
    }
    const passwordVal = /^[a-z]+[A-Z]+[0-9]+|[a-z]+[0-9]+[A-Z]+|[0-9]+[a-z]+[A-Z]+|[0-9]+[A-Z]+[a-z]+|[A-Z]+[0-9]+[a-z]+|[A-Z]+[a-z]+[0-9]+$/;
    if (!passwordVal.test(this.user.password.trim())) {
      this.presentAlert('密码格式不正确！');
      return false;
    }
    if ('' === this.user.monicker.trim() || null === this.user.monicker.trim() || undefined === this.user.monicker.trim()) {
      this.presentAlert('姓名不能为空！');
      return false;
    }
    const loading = await this.loadingController.create({
      message: '注册中...'
    });
    await loading.present();
    this.http.post('/user/register', this.user)
        .subscribe((data) => {
          this.result = data;
          console.log(this.result.code);
          if ('301' === this.result.code) {
            console.log('1111111111');
            loading.dismiss();
            this.presentToast(this.result.msg);
            return;
          }
          if ('200' === this.result.code) {
            console.log('2222222222');
            loading.dismiss();
            this.presentToast(this.result.msg);
            // this.closeRegister();
            return;
          }
          if ('0' === this.result.code) {
            console.log('2222222222');
            loading.dismiss();
            this.presentToast(this.result.msg);
            // this.closeRegister();
            this.goLogin();
            return;
          } else {
            loading.dismiss();
            this.presentToast('注册失败');
            return;
          }
          console.log(data);
        },
        response => {
          loading.dismiss();
          console.log(response.error.meta.message);
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
