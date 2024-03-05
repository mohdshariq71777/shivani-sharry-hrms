import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/products.service';
import { FetchedProduct } from '../models/fetched-product.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {
  constructor(private prodServ: ProductService) { }
  product_group_categories = [];
  product_type_categories = [];
  product_categories = [];
  products: FetchedProduct[] = [];
  @ViewChild('productForm') productForm: NgForm | undefined;
  ngOnInit(): void {
    this.prodServ.getActiveGroupCat().subscribe(catgrs => this.product_group_categories = catgrs.result);
    this.prodServ.fetchActiveProducts()
    this.prodServ.fetchActiveProductsUpdateListener().subscribe(products => {
      this.products = products;
    })
  }
  addProduct() {
    // this.prodServ.addProduct(this.productForm.form.controls['grp_cat_id'].value, this.productForm.form.controls['type_cat_id'].value, this.productForm.form.controls['isActive'].value, this.productForm.form.controls['catName'].value)
    const product = {
      grpCatId: this.productForm.form.controls['grp_cat_id'].value,
      typeCatId: this.productForm.form.controls['type_cat_id'].value,
      catId: this.productForm.form.controls['cat_id'].value,
      isActive: this.productForm.form.controls['isActive'].value,
      productName: this.productForm.form.controls['prod_name'].value,
      brand_name: this.productForm.form.controls['brand_name'].value,
      price: this.productForm.form.controls['prod_price'].value
    }
    this.prodServ.addProduct(product);
    this.productForm.form.reset();
  }
  selectGrpCat() {
    this.prodServ.getActiveTypeCat(this.productForm.form.controls['grp_cat_id'].value).subscribe(catgrs => this.product_type_categories = catgrs.result);
  }
  selectTypeCat() {
    this.prodServ.getActiveCat(this.productForm.form.controls['grp_cat_id'].value, this.productForm.form.controls['type_cat_id'].value).subscribe(catgrs => {
      this.product_categories = catgrs.result;
    });
  }
}
