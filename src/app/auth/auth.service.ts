import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';
import {delay} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    console.log('检测登录用户是否合法');
    return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    );
  }

  logout(): void {
    console.log('用户退出登录');
    this.isLoggedIn = false;
  }

  constructor() { }

}
