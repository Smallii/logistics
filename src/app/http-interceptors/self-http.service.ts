import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class SelfHttpService {

    restServer: string; // 默认为public
    http: any;

    constructor(Http: HttpClient) {
        this.http = Http;
        this.restServer = 'http://localhost:8099';
    }
    public get(url: string, params?: Object, cb?: Function, options?: Object) {
        let httpParams = new HttpParams();
        console.log('get:start');

        if (params) {
            for (const key in params) {
                if (params[key] === false || params[key]) {
                    httpParams = httpParams.set(key, params[key]);
                }
            }
        }


        this.http.get(url, { headers: options, params: httpParams })
            .subscribe((res: any) => {
                console.log('get:end', res);
                cb(res);
            });
    }

    public post(url: string, data?: Object, cb?: Function, options?: Object) {
        console.log('post:start');

        this.http.post(url, data, options)
            .subscribe((res: any) => {
                console.log('post:end', res);
                cb(res);
            });
    }

    public put(url: string, data?: Object, cb?: Function, options?: Object) {
        console.log('put:start');

        this.http.put(url, data, options)
            .subscribe((res: any) => {
                console.log('put:end', res);
                cb(res);
            });
    }

    public delete(url: string, params?: Object, cb?: Function, options?: Object) {
        let httpParams = new HttpParams();
        console.log('delete:start');
        if (params) {
            for (const key in params) {
                if (params[key]) {
                    httpParams = httpParams.set(key, params[key]);
                }
            }
        }
        this.http.delete(url, { headers: options, params: httpParams })
            .subscribe((res: any) => {
                console.log('delete:end', res);
                cb(res);
            });
    }
}
