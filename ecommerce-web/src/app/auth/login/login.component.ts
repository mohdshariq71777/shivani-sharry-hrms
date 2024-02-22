import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authServ: AuthService) { }
  @ViewChild('loginForm') loginForm: NgForm | undefined;
  ngOnInit(): void {

  }
  login() {
    this.authServ.login(this.loginForm?.controls['email'].value, this.loginForm?.controls['password'].value)
  }
}
