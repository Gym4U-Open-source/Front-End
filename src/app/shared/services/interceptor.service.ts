import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    console.log('INTERCEPTANDO REQUEST: ', token);
    console.log('INTERCEPTANDO REQUEST: ', token?.replace(/['"]+/g, ''));

    //let headers = new HttpHeaders()
    //  .set('Authorization', `Bearer ${token}`)
    //  .set('Accept', '*/*')
    //  .set('Content-Type', 'application/json')
    //  .set('Access-Control-Allow-Origin', '*')
    //  .set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

    let newRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token?.replace(/['"]+/g, '')}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      },
    });

    //newRequest.headers.set('Accept', '*/*');
    //newRequest.headers.set('Authorization', `Bearer ${token}`);
    //newRequest.headers.set('Content-Type', 'application/json');
    //newRequest.headers.set('Access-Control-Allow-Origin', '*');
    //newRequest.headers.set(
    //  'Access-Control-Allow-Methods',
    //  'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    //);

    console.log(newRequest.headers);
    return next.handle(newRequest);
  }
}

// tokenizeReq.headers.set('Accept', '*/*');
// tokenizeReq.headers.set('x-ms-blob-type', 'BlockBlob');
// if (tokenizeReq.body != null) {
//   tokenizeReq.headers.set('Content-Type', tokenizeReq.body.type);
//   tokenizeReq.headers.set('x-ms-blob-content-type', tokenizeReq.body.type);

// "content-type": "application/json",
// "Access-Control-Allow-Origin": "*",
// "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
