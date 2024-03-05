import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }
  role: number | null = null;
  isAuth: boolean = false;
  loginComp: boolean = true;
  ngOnInit(): void {
    this.authService.getAuthrz().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }
  logOut() {
    this.authService.logOut();
  }
  changeToLogin() {
    this.loginComp = true;
  }
  changeToSignup() {
    this.loginComp = false;
  }
  removeBackdrop() {
    if (Array.from(document.querySelectorAll('.offcanvas-backdrop')).length > 1) {
      document.querySelector('.offcanvas-backdrop').remove();
    }
  }
}
