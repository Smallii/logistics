import {Component, Input, OnInit} from '@angular/core';
import { ModalController, NavParams, LoadingController, ToastController } from '@ionic/angular';
// 加载Http请求模块
import { HttpClient } from '@angular/common/http';
// 加载本地存储模块
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.page.html',
  styleUrls: ['modal.page.scss']
})
export class ModalPage implements OnInit {
  @Input() userName: string;
  @Input() name: string;
  @Input() userPwd: string;
    public user: any;
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
              private storage: Storage) {
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

  dissView() {
    // this.getData();
    // console.log('接收本页面的输入值：', this.prop1, this.prop2);
    this.modalController.dismiss();
  }

  async getData() {
    console.log('发送GET请求');
    const loading = await this.loadingController.create({
      message: '获取数据...'
    });
    await loading.present();
    this.http.get(this.heroesUrl)
        .subscribe((data) => {
            console.log('成功', data);
            loading.dismiss();
            this.presentToast('获取数据成功');
        }, error => {
            this.storage.set('token', 'www');
            loading.dismiss();
            this.presentToast('请求超时');
            this.storage.get('token').then((token) => {
                console.log('Me: Hey, ' + token + '! You have a very nice name.');
            });
        });
  }

    /**
     * 登录用户
     */
    async loginUser() {
        console.log('输入的用户名', this.userName);
        console.log('输入的密码', this.userPwd);
        const loading = await this.loadingController.create({
            message: '登录中...'
        });
        const headers = {
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        await loading.present();
        const request = {
            username: this.userName,
            password: this.userPwd
        };
        this.http.post(this.heroesUrl + '/login', null , { params: request, observe: 'response' })
            .subscribe((res) => {
                this.user = res.body;
                console.log(res.body);
                // 获取headers中的token
                this.token = res.headers.get('Authorization');
                console.log('Token：', this.token);
                // console.log(this.user);
                loading.dismiss();
                if (res.body.meta.status === 800) {
                    this.storage.set('token', this.token);
                    this.presentToast(res.body.meta.message);
                    alert(this.storage.get('token'));
                } else {
                    this.presentToast(this.user.msg);
                }

            }
            , error => {
                    loading.dismiss();
                    this.presentToast('请求超时');
                // this.presentToast('登录失败');
            });
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
    this.http.post(this.heroesUrl + '/register', null, { params: request })
        .subscribe((data) => {
            console.log(data);
            loading.dismiss();
            this.presentToast('注册成功');
        }, function (error) {
            console.log(error);
            loading.dismiss();
            this.presentToast('未知错误');
        });
  }

    async presentToast(content: string) {
        const toast = await this.toastController.create({
            message: content,
            duration: 2000
        });
        toast.present();
    }
}
