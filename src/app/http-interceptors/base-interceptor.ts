import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs/internal/observable/of';
import {mergeMap} from 'rxjs/internal/operators/mergeMap';

// 我们要实现HttpInterceptor接口
@Injectable()
export class BaseInterceptor implements HttpInterceptor {

    private eventSuccess: any;
    private eventHandle: any;
    constructor(
        private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = 'http://10.64.3.31:8099';
        if (req.url === '/login' || req.url === '/register') {
            const authReq = req.clone({
                url: url + req.url
            });
            return next.handle(authReq).pipe(
                mergeMap((event: any) => {
                    // 正常返回，处理具体返回参数
                    if (event instanceof HttpResponse && event.status === 200) {
                        return this.successData(event);
                    }
                    return of(event);
                }),
                catchError((err: HttpErrorResponse) => this.handleData(err))
            );
        } else {
            const authReq = req.clone({
                // localStorage.getItem('token')
                url: url + req.url,
                headers: req.headers.set('Authorization', localStorage.getItem('token')),
            });
            return next.handle(authReq).pipe(
                mergeMap((event: any) => {
                    // 正常返回，处理具体返回参数
                    if (event instanceof HttpResponse && event.status === 200) {
                        return this.successData(event);
                    }
                    return of(event);
                }),
                catchError((err: HttpErrorResponse) => this.handleData(err))
                // ,
                // catchError((err: HttpErrorResponse) => this.handleData(err))
            );
        }
    }

    /**
     * 请求成功调用
     */
    private successData(event: HttpResponse<any>): Observable<any> {
        // 业务处理：一些通用操作
        this.eventSuccess = event;
        console.log('调用成功时回调：', this.eventSuccess);
        if (this.eventSuccess.body.code === '200') {
            return of(event);
        }
        if (this.eventSuccess.body.meta.status === 800) {
            return of(event);
        }
        if (this.eventSuccess.body.meta.status === 403) {
            console.log(this.eventSuccess.body.meta.message);
            this.router.navigate(['/login']);
            return throwError(event);
        }
    }

    /**
     * 请求失败调用
     */
    private handleData(
        event: HttpErrorResponse): Observable<any> {
        console.log('调用失败时回调：', this.eventHandle.body.meta);
        // 业务处理：一些通用操作
        switch (event.status) {
            case 401:
                console.log('not login') ;
                this.router.navigate(['/login']);
                return of(event);
                break;
            default:
        }
        return throwError(event);
    }
}
