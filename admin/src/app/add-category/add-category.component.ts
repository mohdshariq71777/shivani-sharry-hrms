import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  constructor(private prodServ: ProductService) { }
  product_group_categories = [];
  product_type_categories = [];
  @ViewChild('catgForm') catgForm: NgForm | undefined;
  ngOnInit(): void {
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
  }
  addCategory() {
    this.prodServ.addCat(this.catgForm.form.controls['grp_cat_id'].value, this.catgForm.form.controls['type_cat_id'].value, this.catgForm.form.controls['isActive'].value, this.catgForm.form.controls['catName'].value)
    this.catgForm.form.reset();
  }
  selectGrpCat() {
    this.prodServ.getActiveTypeCat(this.catgForm.form.controls['grp_cat_id'].value).subscribe(catgrs => this.product_type_categories = catgrs.result);

  }
}
