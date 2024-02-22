import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { };
  login(email: string, password: string) {
    const credentials = { email: email, password: password }
    this.http.post<any>(this.auth_url, credentials).subscribe(response => {
      console.log(response)
      if (response.status === 200) {
        this.setAuth(true, response.token);
        this.router.navigate(['/dashboard']);
        this.toastr.success('Logged in sucessfully!', 'Welcome');
      }
      else {
        console.log('hi bhai')
      }
    }, error => {
      console.log(error);
      console.log(error.error.message);
      console.log(error.statusText);
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
