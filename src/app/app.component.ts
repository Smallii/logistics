import { Component } from '@angular/core';

import {AlertController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';

// import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private alertController: AlertController,
    private nav: NavController
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
        /**
         * 设置沉浸式状态栏
         * 默认的系统状态栏
         * this.statusBar.styleDefault();
         */
        // this.statusBar.styleDefault();
        // set status bar to white
        this.statusBar.backgroundColorByHexString('#3880ff');
        // let status bar overlay webview
        this.statusBar.overlaysWebView(true);
      this.splashScreen.hide();
    });
  }

  /**
   * Android 通过物理返回按钮退出应用
   */
  backButtonEvent() {
    this.platform.backButton.subscribe(() => {
      if (this.router.url.indexOf('tab1') > -1 || this.router.url.indexOf('tab2') > -1 || this.router.url.indexOf('tab4') > -1 || this.router.url.indexOf('login') > -1) {
        if (this.lastTimeBackPress < 1) {
          this.presentAlertConfirm();
          this.lastTimeBackPress = 1;
        }
        // if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
        //   navigator['app'].exitApp(); // 退出APP
        // } else {
        //   this.presentAlertConfirm();
        //   this.lastTimeBackPress = new Date().getTime();
        // }
        // navigator['app'].exitApp(); //ionic4 退出APP的方法
      }
    });
  }

  /**
   * 提示退出暂时不用
   */
  // async presentToast(content: string) {
  //   const toast = await this.toastController.create({
  //     message: content,
  //     position: 'middle',
  //     duration: 3000
  //   });
  //   toast.present();
  // }

  /**
   * alert提示退出
   */
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: '您要退出APP吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.lastTimeBackPress = 0;
          }
        }, {
          text: '退出',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });
    await alert.present();
  }
}
