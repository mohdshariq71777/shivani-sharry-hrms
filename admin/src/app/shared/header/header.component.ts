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
  ngOnInit(): void {
    this.authService.getAuthrz().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }
  logOut() {
    this.authService.logOut();
  }
}
