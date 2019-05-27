import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
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

  private heroesUrl = 'http://10.64.3.31:8099';  // URL to web api

  constructor(
      private http: HttpClient,
      public loadingController: LoadingController,
      public toastController: ToastController,
      private router: Router,
      public modalController: ModalController
  ) { }

  ngOnInit() {
    console.log('登录');
  }

  /**
   * 关闭模态窗
   */
  async closeLogin(sts: string) {
    // this.getData();
    // console.log('接收本页面的输入值：', this.prop1, this.prop2);
    if (sts === '800') {
      this.modalController.dismiss({
        result: 'success'
      });
    } else {
      this.modalController.dismiss({
        result: 'fail'
      });
    }
  }

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
      duration: 2000
    });
    toast.present();
  }

  /**
   * 登录
   */
  async loginUser() {
    console.log('输入的用户名', this.userName);
    console.log('输入的密码', this.userPwd);
    const loading = await this.loadingController.create({
      message: '登录中...'
    });
    await loading.present();
    const request = {
      username: this.userName,
      password: this.userPwd
    };
    this.http.post(this.heroesUrl + '/login', null, { params: request, observe: 'response' })
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
                this.closeLogin('800');
              } else {
                this.presentToast(this.result.meta.message);
                loading.dismiss();
              }
            },
            response => {
              loading.dismiss();
              this.presentToast(response.error.meta.message);
            },
            () => {
              loading.dismiss();
              console.log('The POST observable is now completed.');
            }
        );
  }

}
