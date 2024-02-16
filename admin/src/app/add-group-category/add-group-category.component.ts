import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from '../_services/products.service';

@Component({
  selector: 'app-add-group-category',
  templateUrl: './add-group-category.component.html',
  styleUrls: ['./add-group-category.component.css']
})
export class AddGroupCategoryComponent implements OnInit {
  constructor(private prodServ: ProductService) { }
  @ViewChild('groupCatg') groupCatg: NgForm | undefined;
  ngOnInit(): void {

  }
  addGroupCat() {
    // console.log(this.groupCatg.form.controls['isActive'].value)
    // console.log(this.groupCatg.form.controls['name'].value)
    this.prodServ.addGroupCat(this.groupCatg.form.controls['catName'].value, this.groupCatg.form.controls['isActive'].value)
  }
}
