import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ChangePasswordService } from 'src/app/_services/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  otpSent: boolean = false;
  otpVerified: boolean = false;
  newSetPassValue: string | null = null;
  constructor(private changePassServ: ChangePasswordService) { }
  @ViewChild('sendOtpForm') sendOtpForm: NgForm | undefined;
  @ViewChild('verifyOtpForm') verifyOtpForm: NgForm | undefined;
  @ViewChild('setPasswordForm') setPasswordForm: NgForm | undefined;
  ngOnInit(): void {
    this.changePassServ.otpVerifiedSub.subscribe(otpVerified => {
      this.otpVerified = otpVerified;
    })
  }
  sendOtp() {
    this.changePassServ.sendOtp(this.sendOtpForm.form.controls['email'].value);
    this.otpSent = true;
  }
  verifyOtp() {
    this.changePassServ.verifyOtp(Number(this.verifyOtpForm.controls['otp'].value));
  }
  setPassword() {
    console.log(this.setPasswordForm.form.controls['newPass'].value, this.setPasswordForm.form.controls['cnfmPass'].value)
    if (this.setPasswordForm.form.controls['newPass'].value === this.setPasswordForm.form.controls['cnfmPass'].value) {
      this.newSetPassValue = this.setPasswordForm.form.controls['newPass'].value;
      this.changePassServ.setNewPassword(this.newSetPassValue);
    }
    else { this.newSetPassValue = null }
  }
}
