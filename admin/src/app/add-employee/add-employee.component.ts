import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @ViewChild('empForm') empForm: NgForm | undefined;
  constructor(private empServ: EmployeeService) { }

  ngOnInit(): void {
  }
  addEmployee() {
    const newEmp = {
      emp_id: null,
      name: this.empForm?.form.controls['name'].value,
      email: this.empForm?.form.controls['email'].value,
      gender: this.empForm?.form.controls['gender'].value,
      designation: this.empForm?.form.controls['designation'].value,
      address: this.empForm?.form.controls['address'].value,
      phone: this.empForm?.form.controls['phone'].value,
      department: this.empForm?.form.controls['department'].value,
      joining_date: this.empForm?.form.controls['doj'].value,
      dob: this.empForm?.form.controls['dob'].value,
      role: 1
    }
    this.empServ.addEmployee(newEmp)
  }
}
