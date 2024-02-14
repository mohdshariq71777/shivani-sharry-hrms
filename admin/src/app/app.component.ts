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
  title = 'frontend';
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
    if (!sessionStorage.getItem('token')) {
      return
    }
    else {
      const emp_id = sessionStorage.getItem('emp_id');
      const decr_emp_id = CryptoJS.AES.decrypt(emp_id, 'your-secret-key').toString(CryptoJS.enc.Utf8);
      this.authService.setAuth(true, Number(decr_emp_id), sessionStorage.getItem('token'));
    }
  }
}
