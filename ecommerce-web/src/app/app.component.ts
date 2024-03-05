import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bloomcraft';
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    if (!sessionStorage.getItem('token')) {
      return
    }
    else {
      this.authService.setAuth(true, sessionStorage.getItem('token'));
    }
  }
}
