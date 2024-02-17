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
  @ViewChild('groupCatgFrm') groupCatgFrm: NgForm | undefined;
  ngOnInit(): void {

  }
  addGroupCat() {
    this.prodServ.addGroupCat(this.groupCatgFrm.form.controls['catName'].value, this.groupCatgFrm.form.controls['isActive'].value)
    this.groupCatgFrm.form.reset();
  }
}
