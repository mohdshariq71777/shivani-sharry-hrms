import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private authService: AuthService) { }
  role: number | null = null;
  isAuth: boolean = false;
  ngOnInit(): void {
    this.authService.getAuthrz().subscribe(isAuth => {
      this.isAuth = isAuth;
      if (!this.isAuth) return;
      this.employeeService.fetchEmployee();
      this.employeeService.fetchSingEmployeeUpdateListener().subscribe(loggedEmp => {
        this.role = loggedEmp.role;
      });
    });
  }
  logOut() {
    this.authService.logOut();
  }
}
