import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employee_url = `http://localhost:3000/api/employees`;
  private employees: Employee[] = [];
  updatedEmployees = new Subject<Employee[]>();
  updatedSingleEmployee = new Subject<Employee>();
  constructor(private http: HttpClient, private router: Router, private authServ: AuthService) { }
  addEmployee(newEmp: Employee) {
    const employee: Employee = {
      emp_id: null,
      name: newEmp.name,
      email: newEmp.email,
      gender: newEmp.gender,
      designation: newEmp.designation,
      address: newEmp.address,
      phone: newEmp.phone,
      department: newEmp.department,
      joining_date: newEmp.joining_date,
      dob: newEmp.dob,
      role: 1
    };
    this.http.post<{ message: string }>(this.employee_url, employee).subscribe((res) => {
      this.router.navigate(['/'])
    })
  }
  fetchEmployees() {
    this.http.get<{ employees: Employee[], message: string }>(this.employee_url).subscribe((res) => {
      this.employees = res.employees;
      this.updatedEmployees.next(this.employees);
    })
  }
  fetchEmployee() {
    const empId = this.authServ.empId;
    this.http.get<{ employeeObj: Employee, message: string }>(`${this.employee_url}/${empId}`).subscribe(res => {
      this.updatedSingleEmployee.next(res.employeeObj);
    });
  }
  fetchEmployeesUpdateListener() {
    return this.updatedEmployees.asObservable();
  }
  fetchSingEmployeeUpdateListener() {
    return this.updatedSingleEmployee.asObservable();
  }
  // updatePost(id: number, changedTitle: string, changedContent: string) {
  //   const alteredPost = { title: changedTitle, content: changedContent };
  //   this.http.put(`${this.url}/${id}`, alteredPost).subscribe((res) => {
  //     this.router.navigate(['/'])
  //   })
  // }
}
