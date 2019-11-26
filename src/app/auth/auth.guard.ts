import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {ModalController, NavController} from '@ionic/angular';
import {LoginPage} from '../login/login.page';
import {RegisterPage} from '../register/register.page';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  isLoggedIn: string;
  constructor(
      private router: Router,
      public modalController: ModalController,
      public nav: NavController) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    console.log('AuthGuard#canActivate called');
    const url: string = state.url;
    console.log('GO:', url);
    return this.checkLogin();
  }
  checkLogin(): boolean {
    // 判断用户是否处于登录状态  localStorage.getItem('token')
    this.isLoggedIn = localStorage.getItem('token');
    if ('' === this.isLoggedIn || 'null' === this.isLoggedIn || null === this.isLoggedIn || undefined === this.isLoggedIn) {
      console.log('token无效，跳转到登录页面');
      // Navigate to the login page with extras
      // this.router.navigate(['/login']);
      this.nav.navigateRoot('/login');
      // 打开登录模态窗
      // this.openLogin();
      return false;
    } else {
      return true;
    }
  }
}
