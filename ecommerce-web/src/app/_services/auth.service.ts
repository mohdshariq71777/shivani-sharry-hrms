import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backend_url = `http://localhost:3000/api`;
  token: string | null = null;
  empId: number | null = null;
  auth: boolean = false;
  encr_emp_id: string | null = null;
  private isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { };
  signup(user: User) {
    this.http.post<{ message: string }>(`${this.backend_url}/signup`, user).subscribe(res => {
    }, err => {
      return
    })
  }
  verifyEmail(inpEmail: string) {
    return this.http.post<{ message: string }>(`${this.backend_url}/check-email`, { email: inpEmail });
  }
  login(email: string, password: string) {
    const credentials = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number, name: string }>(`${this.backend_url}/login`, credentials).subscribe(response => {
      this.setAuth(true, response.token);
      this.toastr.success('Logged in sucessfully!', 'Welcome');
      document.querySelector('#authCanvas').classList.remove('show');
      document.querySelector('.offcanvas-backdrop').remove();
    }, error => {
      this.toastr.error(error.error.message, error.statusText);
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
    this.toastr.success('Logged out sucessfully!', 'See you again :)');
  }
}
