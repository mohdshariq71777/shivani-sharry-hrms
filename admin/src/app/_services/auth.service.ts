import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { BehaviorSubject, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth_url = `http://localhost:3000/api/auth`;
  token: string | null = null;
  empId: number | null = null;
  auth: boolean = false;
  encr_emp_id: string | null = null;
  private isAuth = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { };
  login(email: string, password: string) {
    const credentials = { email: email, password: password }
    this.http.post<{ token: string, expiresIn: number, empId: number }>(`${this.auth_url}/login`, credentials).subscribe(res => {
      this.setAuth(true, res.empId, res.token);
      this.router.navigate(['/my-profile']);
    })
  }
  setAuth(authz: boolean, empId: number | null, token: string | null) {
    this.auth = authz;
    this.empId = empId;
    this.isAuth.next(authz);
    this.token = token;
    this.encr_emp_id = CryptoJS.AES.encrypt(empId.toString(), 'your-secret-key').toString();
    sessionStorage.setItem('emp_id', this.encr_emp_id);
    sessionStorage.setItem('token', token);
  }
  getAuthrz() {
    return this.isAuth.asObservable();
  }
  logOut() {
    this.router.navigate(['/']);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('emp_id');
    this.setAuth(false, null, null);
    this.isAuth.next(false);
  }
}
