import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/products.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private productService: ProductService) { }
  mensTopwearColl: any = [];
  mensTopwearColl5: any = [];
  womensTopwearColl: any = [];
  womensTopwearColl5: any = [];
  ngOnInit(): void {
    this.productService.fetchGroupCategoryActiveProducts(7, 7).subscribe(res => {
      console.log(res);
      this.mensTopwearColl = res.result;
      for (let i = 0; i <= 4; i++) {
        this.mensTopwearColl5.push(this.mensTopwearColl[i])
      }
    });
    this.productService.fetchGroupCategoryActiveProducts(9, 12).subscribe(res => {
      console.log(res);
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
}
