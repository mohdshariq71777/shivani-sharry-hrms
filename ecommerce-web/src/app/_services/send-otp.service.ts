import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SendOtpService {
  private mail_url = `http://localhost:3000/api/sendmail`;
  private phone_url = `http://localhost:3000/api/sendsms`;
  private otp: number | null = null;
  private otpVerified: boolean = false;
  otpVerifiedSub = new Subject<boolean>();
  constructor(private http: HttpClient, private toastr: ToastrService) { }
  sendThroughMail(mail_id: string) {
    console.log(mail_id);
    this.http.post<{ otp: number }>(this.mail_url, { email_id: mail_id }).subscribe(res => {
      this.setOtp(res.otp)
      console.log(res.otp);
    })
  }
  // sendThroughPhone(phoneNum: string) {
  //   this.http.post<{ otp: number }>(this.phone_url, { phone: phoneNum }).subscribe(res => {
  //     this.setOtp(res.otp)
  //     console.log(res.otp);
  //   })
  // }
  setOtp(otp: number) {
    this.otp = otp;
  }
  verifyOtp(otp: number) {
    this.otpVerified = true ? otp === this.otp : false;
    this.otpVerifiedSub.next(this.otpVerified)
    if (!this.otpVerified) {
      this.toastr.error('Enter correct OTP!', 'Invalid OTP');
    }
  }
  // setNewPassword(password: string) {
  //   this.http.post<{ message: string }>(`${this.mail_url}/newPassword`, { new_password: password }).subscribe(res => {
  //     console.log(res);
  //   })
  // }
}
