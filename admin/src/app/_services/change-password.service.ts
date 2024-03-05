import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  private mail_url = `http://localhost:3000/api/mail`;
  private otp: number | null = null;
  private otpVerified: boolean = false;
  otpVerifiedSub = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }
  sendOtp(mail_id: string) {
    this.http.post<{ otp: number }>(this.mail_url, { email_id: mail_id }).subscribe(res => {
      this.setOtp(res.otp)
    })
  }
  setOtp(otp: number) {
    this.otp = otp;
  }
  verifyOtp(otp: number) {
    this.otpVerified = true ? otp === this.otp : false;
    this.otpVerifiedSub.next(this.otpVerified)
  }
  setNewPassword(password: string) {
    this.http.post<{ message: string }>(`${this.mail_url}/newPassword`, { new_password: password }).subscribe(res => {
    })
  }
}
