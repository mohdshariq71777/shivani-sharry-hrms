import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js'
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authServ: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authToken = this.authServ.token;
    if (req.url === 'http://localhost:3000/api/auth/login' || req.url === 'http://localhost:3000/api/mail' || req.url === 'http://localhost:3000/api/mail/newPassword') {
      return next.handle(req)
    }
    else {
      let authToken = sessionStorage.getItem('token');
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`)
      });
      return next.handle(authRequest);
    }
  }
}
