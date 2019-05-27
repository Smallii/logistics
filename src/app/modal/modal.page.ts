import {Component, Input, OnInit} from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';
// 加载Http请求模块
import { HttpClient, HttpHeaders } from '@angular/common/http';
// 加载本地存储模块
import { Storage } from '@ionic/storage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.page.html',
  styleUrls: ['modal.page.scss']
})
export class ModalPage implements OnInit {
  @Input() userName: string;
  @Input() name: string;
  @Input() userPwd: string;
    public result: any;
    public token: string;
  private heroesUrl = 'http://10.64.3.31:8099';  // URL to web api
  // private heroesUrlPost = 'http://10.64.3.31:80/app/user';
  // constructor(public modalController: ModalController) {
  //   // componentProps can also be accessed at construction time using NavParams
  // }
  constructor(navParams: NavParams,
              public modalController: ModalController,
              private http: HttpClient,
              public loadingController: LoadingController,
              public toastController: ToastController,
              private storage: Storage,
              private router: Router) {
    console.log(navParams.get('prop1'));
    console.log(navParams.get('prop2'));
    this.getData();
    // componentProps can also be accessed at construction time using NavParams
  }
  // "value" passed in componentProps
  @Input() prop1: string;
  @Input() prop2: string;

  ngOnInit() {
    console.log('传过来的值：', this.prop1, this.prop2);
  }

    /**
     * 跳转到登录页面
     */
    goRoot() {
        this.router.navigate(['/tabs/tab4']);
    }

    /**
     * 关闭模态窗
     */
  async dissView() {
    // this.getData();
    // console.log('接收本页面的输入值：', this.prop1, this.prop2);
    this.modalController.dismiss({
        result: this.result.data.username
    });
  }

  async getData() {
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
    this.http.get(this.heroesUrl + '/user/getUserAllpub', httpOptions)
        .subscribe((data) => {
            console.log('成功', data);
            loading.dismiss();
            // this.storage.get('token').then((token) => {
            //     this.presentToast(token);
            // });
        }, response => {
            loading.dismiss();
            // console.log('失败');
            }, () => {
            loading.dismiss();
            this.presentToast('请求超时');
        });
  }

    /**
     * 获取token
     */
    getToken(): Promise<string> {
        return this.storage.get('token').then((__zone_symbol__value) => {
            console.log('7878', __zone_symbol__value);
            return __zone_symbol__value;
        });
    }

  // getToken() {
  //     this.storage.get('token').then((token) => {
  //         return this.token = token;
  //     });
  // }

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
                    // 关闭登录模态窗
                    this.dissView();
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

    /**
     * 注册用户
     */
    async postData() {
      console.log('发送POST请求');
      console.log('输入的用户名', this.userName);
      console.log('输入的姓名', this.name);
      console.log('输入的密码', this.userPwd);
      const loading = await this.loadingController.create({
          message: '注册中...'
      });
      await loading.present();
    const request = {
        username: this.userName,
        name: this.name,
        password: this.userPwd
    };
    this.http.post(this.heroesUrl + '/user/register', null, { params: request })
        .subscribe((data) => {
            console.log(data);
            loading.dismiss();
            this.presentToast('注册成功');
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

    async presentToast(content: string) {
        const toast = await this.toastController.create({
            message: content,
            duration: 2000
        });
        toast.present();
    }
}
