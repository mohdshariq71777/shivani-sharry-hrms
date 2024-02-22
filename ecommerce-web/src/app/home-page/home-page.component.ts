import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/products.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(private productService: ProductService) { }
  mensTopwearColl = [];
  ngOnInit(): void {
    this.productService.fetchActiveProductsUpdateListener().subscribe(res => console.log(res))
    this.productService.fetchActiveProducts();
  }
}
