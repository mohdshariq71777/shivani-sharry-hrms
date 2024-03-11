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
      for (let i = 0; i <= 4; i++) {
        this.mensTopwearColl5.push(this.mensTopwearColl[i])
      }
    });
    this.productService.fetchGroupCategoryActiveProducts(9, 12).subscribe(res => {
      this.womensTopwearColl = res.result;
      if (this.mensTopwearColl.length > 5) {
        for (let i = 0; i <= 4; i++) {
          this.womensTopwearColl5.push(this.womensTopwearColl[i])
        }
      }
      else {
        this.womensTopwearColl5 = res.result;
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
}
