import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) { }
  mensTopwearColl: any = [];
  mensTopwearColl5: any = [];
  womensTopwearColl: any = [];
  womensTopwearColl5: any = [];
  ngOnInit(): void {
    this.productService.fetchGroupCategoryActiveProducts(7, 7).subscribe(res => {
      this.mensTopwearColl = res.result;
      if (this.mensTopwearColl.length > 5) {
        for (let i = this.mensTopwearColl.length - 1; i > this.mensTopwearColl.length - 6; i--) {
          this.mensTopwearColl5.push(this.mensTopwearColl[i])
        }
      }
      else {
        for (let i = this.mensTopwearColl.length - 1; i >= 0; i--) {
          this.mensTopwearColl5.push(this.mensTopwearColl[i])
        }
      }
    });
    this.productService.fetchGroupCategoryActiveProducts(9, 12).subscribe(res => {
      this.womensTopwearColl = res.result;
      if (this.womensTopwearColl.length > 5) {
        for (let i = this.womensTopwearColl.length - 1; i > this.womensTopwearColl.length - 6; i--) {
          this.womensTopwearColl5.push(this.womensTopwearColl[i])
        }
      }
      else {
        for (let i = this.womensTopwearColl.length - 1; i >= 0; i--) {
          this.womensTopwearColl5.push(this.womensTopwearColl[i])
        }
      }
    });
  }
  goTo(grp_cat_id_passed: number, type_cat_id_passed: number) {
    const queryParamObject = {
      grp_cat_id: grp_cat_id_passed,
      type_cat_id: type_cat_id_passed
    };
    const queryParamString = JSON.stringify(queryParamObject);
    const products = btoa(queryParamString);
    this.router.navigate([`/product-list`],
      { queryParams: { products } }
    )

  }
  sendToDetails(product_id: number) {
    const queryParamObject = {
      productId: product_id
    }
    const queryParamString = JSON.stringify(queryParamObject);
    const productId = btoa(queryParamString);
    this.router.navigate(['/product-details'], {
      queryParams: { productId }
    })
  }
  newProduct(date: string) {
    const givenDate = new Date(date);
    const currentDate = new Date();
    let diffInMS = Number(currentDate) - Number(givenDate);
    const diffInDays = diffInMS / (1000 * 60 * 60 * 24);
    if (diffInDays > 2) {
      return 'The given date is more than two days ago from today.';
    } else {
      return 'The given date is two days or fewer day(s) ago from today.';
    }
  }
}
