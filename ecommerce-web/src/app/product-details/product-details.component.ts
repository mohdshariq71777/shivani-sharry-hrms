import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../_services/products.service';
import { FetchedProduct } from '../models/fetched-product.model';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  images: string[] = [
    "./../../assets/images/product1-slider1.png",
    "./../../assets/images/product1-slider2.png",
    "./../../assets/images/product1-slider3.png",
    "./../../assets/images/product1-slider4.png",
  ];
  optionsForTop = { type: 'loop', perPage: 1, keyboard: false }
  fetchedProduct: FetchedProduct | null = null;
  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      const decodedQueryParamString = this.decodeQueryParam(query)
      if (decodedQueryParamString !== null) {
        const decodedQueryParamObject = JSON.parse(decodedQueryParamString);
        // console.log(decodedQueryParamObject);
        this.fetchProdById(+decodedQueryParamObject['productId']);
      }
      else {
        this.router.navigate(['/error-page'])
      }
    })
  }
  decodeQueryParam(query) {
    try {
      return atob(query['productId'])

    } catch (error) {
      return null
    }
  }
  fetchProdById(product_id: number) {
    this.productService.getActiveProductById(product_id).subscribe(response => {
      this.fetchedProduct = response.result;
      console.log(this.fetchedProduct);
    });
  }
}
