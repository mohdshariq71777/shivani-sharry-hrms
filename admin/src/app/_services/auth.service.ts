import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_url = `http://localhost:3000/api/admin/login`;
  token: string | null = null;
  empId: number | null = null;
  auth: boolean = false;
  encr_emp_id: string | null = null;
  private isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { };
  login(email: string, password: string) {
    const credentials = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number, adminName: string }>(this.auth_url, credentials).subscribe(res => {
      this.setAuth(true, res.token);
      this.router.navigate(['/dashboard']);
    })
  }
  setAuth(authz: boolean, token: string | null) {
    this.auth = authz;
    this.isAuth.next(authz);
    this.token = token;
    sessionStorage.setItem('token', token);
  }
  getAuthrz() {
    return this.isAuth.asObservable();
  }
  logOut() {
    this.setAuth(false, null);
    this.isAuth.next(false);
    this.router.navigate(['/']);
    sessionStorage.removeItem('token');
  }
}
