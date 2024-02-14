import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-all-employee-list',
  templateUrl: './all-employee-list.component.html',
  styleUrls: ['./all-employee-list.component.css']
})
export class AllEmployeeListComponent implements OnInit {
  all_employees: Employee[] = [];
  constructor(private empServ: EmployeeService) {
  }
  ngOnInit() {
    this.empServ.fetchEmployees();
    this.empServ.fetchEmployeesUpdateListener().subscribe(employees => {
      this.all_employees = employees;
    })
  }
}
