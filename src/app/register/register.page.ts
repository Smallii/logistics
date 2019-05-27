import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController, ToastController} from '@ionic/angular';
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

  private heroesUrl = 'http://127.0.0.1:8099';

  public result: any;

  user: any = {
    username: '',
    password: '',
    userType: '1'
  };

  constructor(
      public toastController: ToastController,
      private http: HttpClient,
      public loadingController: LoadingController,
      private router: Router,
      public modalController: ModalController
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
    const loading = await this.loadingController.create({
      message: '注册中...'
    });
    await loading.present();
    this.http.post(this.heroesUrl + '/user/register', this.user)
        .subscribe((data) => {
          this.result = data;
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
            }
        );
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
      duration: 2000
    });
    toast.present();
  }

}
