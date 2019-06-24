import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @Input() userName: string;
  @Input() userPwd: string;

  public result: any;
  public token: string;

  constructor(
      private http: HttpClient,
      public loadingController: LoadingController,
      public toastController: ToastController,
      private router: Router,
      public alertController: AlertController
  ) { }

  ngOnInit() {
    console.log('登录');
  }

  /**
   * 关闭模态窗
   */
  // async closeLogin(sts: string) {
  //   // this.getData();
  //   // console.log('接收本页面的输入值：', this.prop1, this.prop2);
  //   if (sts === '800') {
  //     this.modalController.dismiss({
  //       result: 'success'
  //     });
  //   } else {
  //     this.modalController.dismiss({
  //       result: 'fail'
  //     });
  //   }
  // }

  /**
   * 跳转到注册页面
   */
  goRegister() {
    this.router.navigate(['/register']);
  }

  /**
   * 吐司工具方法
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

  async onsubmit(value) {
    /**
     * 验证用户名
     */
    if ('' === this.userName || null === this.userName || undefined === this.userName) {
      this.presentAlert('用户名不能为空！');
      return false;
    }
    if ('' === this.userPwd || null === this.userPwd || undefined === this.userPwd) {
      this.presentAlert('密码不能为空！');
      return false;
    }
    /**
     * 把普通的{'username':'123','password':'123'}
     * 改变成fromDate格式，不然后台登录验证接收不到值
     */
    const form = new FormData;
    form.append('username', this.userName);
    form.append('password', this.userPwd);
    console.log(form);
    const loading = await this.loadingController.create({
      message: '登录中...'
    });
    await loading.present();
    this.http.post('/login', form, { observe: 'response' })
        .subscribe((val) => {
              this.result = val.body;
              // 获取headers中的token
              // this.token = val.headers.get('Authorization');
              // console.log('Token：', this.token);
              // console.log(this.user);
              if (this.result.meta.status === 800) {
                loading.dismiss();
                // 把登录成功后返回的token存储到本地
                localStorage.setItem('token', val.headers.get('Authorization'));
                // this.storage.set('token', this.token);
                this.presentToast(this.result.meta.message);
                console.log(this.result.data.username);
                localStorage.setItem('username', this.result.data.username);
                localStorage.setItem('monicker', this.result.data.monicker);
                this.router.navigate(['/']);
              } else {
                this.presentToast(this.result.meta.message);
                loading.dismiss();
              }
            },
            response => {
              loading.dismiss();
              console.log(response);
            },
            () => {
              loading.dismiss();
              console.log('The POST observable is now completed.');
            }
        );
  }

}
