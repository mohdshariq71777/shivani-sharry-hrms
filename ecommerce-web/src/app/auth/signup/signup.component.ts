import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './../../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SendOtpService } from 'src/app/_services/send-otp.service';
import { User } from 'src/app/models/user.model';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  otpVerified: boolean = false;
  verifyVia: string | null = '';
  user: User | null = null;
  validName: boolean = true;
  validEmail: boolean = true;
  // validPhone: boolean = true;
  newvalidEmail: boolean = true;
  emailExists: boolean = false;
  preventNext: boolean = true;
  // newvalidPhone: boolean = true;
  validPassword: boolean = true;
  canSendOtp: boolean = false;
  passMatched: boolean = false;
  constructor(private authServ: AuthService, private toastr: ToastrService, private otpService: SendOtpService) { }
  @ViewChild('signupForm') signupForm: NgForm | undefined;
  @ViewChild('emailPhoneForm') emailPhoneForm: NgForm | undefined;
  @ViewChild('otpForm') otpForm: NgForm | undefined;
  @ViewChild('password') password: ElementRef | undefined;
  @Output() navLogin = new EventEmitter<boolean>(false);
  private searchSubject: Subject<string> = new Subject<string>();
  ngOnInit(): void {
    this.otpService.otpVerifiedSub.subscribe(otpStatus => this.otpVerified = otpStatus);
    this.searchSubject.pipe(
      debounceTime(2000), // Debounce for 2 seconds
      distinctUntilChanged(), // Only emit distinct values
      switchMap(() => this.authServ.verifyEmail(this.emailPhoneForm.form.controls['emailMobile'].value)) // Make API call
    ).subscribe((result: { status: number, message: string }) => {
      console.log(result);
      this.preventNext = true;
      if (result.status !== 409) {
        console.log('Not exists')
        this.emailExists = false;
        this.preventNext = false;
      }
      else {
        this.emailExists = true;
        this.preventNext = true;
        console.log('Exists')
      }
    });
  }
  emailChange() {
    this.preventNext = true;
    this.searchSubject.next(this.emailPhoneForm.form.controls['emailMobile'].value);
    // const emailMobilePattern = /^(?=.{1,30}$)(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[6-9]\d{9})$/;
    let emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const input = this.emailPhoneForm.form.controls['emailMobile'].value;
    // this.canSendOtp = emailMobilePattern.test(input);
    // let phonePattern = /^[6-9]\d{9}$/;
    // if (this.canSendOtp && phonePattern.test(input)) {
    //   this.validPhone = true
    // }
    if (emailPattern.test(input)) {
      this.validEmail = true
    }
    else {
      return;
    }
  }
  // checkWhat() {
  // }
  // checkPhone() {
  //   if (this.verifyVia === 'email') {
  //     const input = this.signupForm.form.controls['mobileNum'].value;
  //     let phonePattern = /^[6-9]\d{9}$/;
  //     this.newvalidPhone = phonePattern.test(input);
  //   }
  // }
  checkEmail() {
    if (this.verifyVia === 'phone') {
      const input = this.signupForm.form.controls['email'].value;
      let emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
      this.newvalidEmail = emailPattern.test(input);
    }
  }
  checkName() {
    const namePattern = /^[a-zA-Z\s]{3,25}$/;
    this.validName = namePattern.test(this.signupForm.form.controls['name'].value);
  }
  checkPassword() {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,25}$/;
    this.validPassword = passwordPattern.test(this.signupForm.form.controls['password'].value);
  }
  matchPass() {
    // if (this.validPassword) {
    console.log(this.signupForm.form.controls['password'].value === this.signupForm.form.controls['confPass'].value);
    this.passMatched = this.signupForm.form.controls['password'].value === this.signupForm.form.controls['confPass'].value ? true : false;
    // }
  }
  sendOtp() {
    // if (this.canSendOtp) {
    const input = this.emailPhoneForm.form.controls['emailMobile'].value;
    if (this.validEmail) {
      this.verifyVia = 'email';
      this.otpService.sendThroughMail(input);
    }
    // else if (this.validPhone) {
    //   this.verifyVia = 'phone';
    //   this.otpService.sendThroughPhone(input);
    // }
    else {
      this.toastr.error('Please a valid email!', 'Invalid input');
    }
    // }
  }
  verifyOtp() {
    const input = this.otpForm.form.controls['otp'].value;
    this.otpService.verifyOtp(Number(input));
  }
  signup() {
    if (this.validName && this.validEmail && this.validPassword) {
      this.user = {
        name: this.signupForm.form.controls['name'].value,
        // mobile: this.verifyVia === 'email' ? this.signupForm.form.controls['mobileNum'].value : this.emailPhoneForm.form.controls['emailMobile'].value,
        password: this.signupForm.form.controls['password'].value,
        email: this.verifyVia === 'email' ? this.emailPhoneForm.form.controls['emailMobile'].value : this.signupForm.form.controls['email'].value,
      }
      this.authServ.signup(this.user);
      console.log(this.user);
      this.signupForm.reset();
      this.password.nativeElement?.blur();
    }
  }
  navToLogin() {
    this.navLogin.emit(true);
  }
}
