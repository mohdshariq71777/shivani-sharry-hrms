import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }
  product_list: any = [];
  group_cat_id: number | null = null;
  type_cat_id: number | null = null;
  cat_id: number | null = null;
  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      const decryptedParam = atob(query['products'])
      const parsedParam = JSON.parse(decryptedParam);
      this.group_cat_id = parsedParam['grp_cat_id'];
      this.type_cat_id = parsedParam['type_cat_id'];
      this.cat_id = parsedParam['cat_id'] ? parsedParam['cat_id'] : null;
    })
    if (this.cat_id === null) {
      this.productService.fetchGroupCategoryActiveProducts(this.group_cat_id, this.type_cat_id).subscribe(res => {
        for (let i = res.result.length - 1; i >= 0; i--) {
          this.product_list.push(res.result[i])
        }
      });
    }
    else {
      this.productService.getActiveProducts(this.group_cat_id, this.type_cat_id, this.cat_id).subscribe(res => {
        for (let i = res.result.length - 1; i >= 0; i--) {
          this.product_list.push(res.result[i])
        }
      });
    }
  }
  sendToDetails(product_id: number) {
    const queryParamObject = {
      productId: product_id
    }
    const queryParamString = JSON.stringify(queryParamObject);
    const productId = btoa(queryParamString);
    this.router.navigate(['/product-details'], { queryParams: { productId } })
    this.productService.getActiveProductById(product_id);
  }
}
