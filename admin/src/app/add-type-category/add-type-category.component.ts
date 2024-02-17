import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';

@Component({
  selector: 'app-add-type-category',
  templateUrl: './add-type-category.component.html',
  styleUrls: ['./add-type-category.component.css']
})
export class AddTypeCategoryComponent implements OnInit {
  constructor(private prodServ: ProductService) { }
  product_group_categories = [];
  @ViewChild('typeCatgForm') typeCatgForm: NgForm | undefined;
  ngOnInit(): void {
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
  }
  addTypeCategory() {
    this.prodServ.addTypeCat(this.typeCatgForm.form.controls['grp_cat_id'].value, this.typeCatgForm.form.controls['catName'].value, this.typeCatgForm.form.controls['isActive'].value);
    this.typeCatgForm.form.reset();
  }
}
