import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {
  ActionSheetController,
  AlertController, Events,
  IonTabs,
  MenuController,
  ModalController,
  NavController, Platform,
  PopoverController, ToastController
} from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  // 获取tabs的路由
  @ViewChild('tabs') tabs: IonTabs;
  lastTimeBackPress = 0;
  tabsCanGoBack = false;
  tabsParentCanGoBack = false;
  public token: string;
  constructor(
      public platform: Platform,
      private router: Router,
      public events: Events,
      public nav: NavController,
      public alertCtrl: AlertController,
      public modalCtrl: ModalController,
      public menuCtrl: MenuController,
      public actionSheetCtrl: ActionSheetController,
      public popoverCtrl: PopoverController,
      public toastController: ToastController,
      private alertController: AlertController) {
  }

  /**
   * 订阅Android返回按钮事件
   */
  ngOnInit() {
    this.platform.backButton.subscribe(() => {
      // 先判断是否能返回，不能返回则认为是根页面
      this.tabsCanGoBack = this.tabs.outlet.canGoBack();
      this.tabsParentCanGoBack = this.tabs.outlet.parentOutlet.canGoBack();
      // 处理弹出层
      this.androidBackButtonHandle();
    });
  }

  /**
   * 异步处理弹出层
   */
  async androidBackButtonHandle() {
    try {
      // 如果有弹出层打开，则关闭并return
      const alert = await this.alertCtrl.getTop();
      if (alert) {
        alert.dismiss();
        return;
      }
      const action = await this.actionSheetCtrl.getTop();
      if (action) {
        action.dismiss();
        return;
      }
      const popover = await this.popoverCtrl.getTop();
      if (popover) {
        popover.dismiss();
        return;
      }
      const modal = await this.modalCtrl.getTop();
      if (modal) {
        modal.dismiss();
        return;
      }
      const isOpen = await this.menuCtrl.isOpen();
      if (isOpen) {
        this.menuCtrl.close();
        return;
      }
      if (!this.tabsCanGoBack && !this.tabsParentCanGoBack) {
        if (this.lastTimeBackPress < 1) {
          this.presentAlertConfirm();
          this.lastTimeBackPress = 1;
        }
        // this.native.appMinimize();
        return;
      }
    } catch (error) {
    }
  }

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

  async presentToast(content: string) {
    const toast = await this.toastController.create({
      message: content,
      position: 'middle',
      duration: 3000
    });
    toast.present();
  }

  /**
   * 跳转到登录页面
   */
  goLogin() {
    this.nav.navigateRoot(['/login']);
    // this.router.navigate(['/login']);
  }

  /**
   * 打开登录模态窗
   */
  // async openLogin() {
  //   console.log('打开登录页模态框');
  //   const value = '张三';
  //   const value2 = '20';
  //   const modal = await this.modalController.create({
  //     component: LoginPage,
  //     componentProps: {
  //       'prop1': value,
  //       'prop2': value2
  //     }
  //   });
  //   await modal.present();
  //   // 监听销毁的事件
  //   const { data } = await modal.onDidDismiss();
  //   console.log(data.result);
  //   if (data.result !== 'success') {
  //     this.openRegister();
  //   }
  // }

  /**
   * 打开注册模态窗
   */
  // async openRegister() {
  //   console.log('打开注册页模态框');
  //   const value = '张三';
  //   const value2 = '20';
  //   const modal = await this.modalController.create({
  //     component: RegisterPage,
  //     componentProps: {
  //       'prop1': value,
  //       'prop2': value2
  //     }
  //   });
  //   await modal.present();
  //   // 监听销毁的事件
  //   const { data } = await modal.onDidDismiss();
  //   console.log(data.result);
  //   this.openLogin();
  // }
}
