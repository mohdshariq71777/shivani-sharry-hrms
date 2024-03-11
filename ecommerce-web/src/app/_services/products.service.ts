import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GroupCategory } from '../models/group-category';
import { TypeCategory } from '../models/type-category.model';
import { ToastrService } from 'ngx-toastr';
import { FetchedProduct } from '../models/fetched-product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api_url = `http://localhost:3000/api`;
  private products = [];
  private productsSub = new Subject();
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { };
  fetchGroupCategoryActiveProducts(grpCtId: number, tpCtId: number) {
    return this.http.get<{ status: number, result: any[], message: string }>(`${this.api_url}/get-group-category-active-products?groupCatId=${grpCtId}&typeCatId=${tpCtId}`)
  }
  getActiveGroupCat() {
    return this.http.get<{ status: number, message: string, result: GroupCategory[] }>(`${this.api_url}/get-active-group-category`)
  }
  getActiveTypeCat(grpCatId: number) {
    return this.http.get<{ status: number, message: string, result: TypeCategory[] }>(`${this.api_url}/get-active-type-category?grp_cat_id=${grpCatId}`,)
  }
  getActiveCat(grpCatId: number, typeCatId: number) {
    // const payload = { grp_cat_id: grpCatId, type_cat_id: typeCatId }
    return this.http.get<{ status: number, message: string, result: [] }>(`${this.api_url}/get-active-category?grp_cat_id='${grpCatId}'&type_cat_id=${typeCatId}`)
  }
  getActiveProducts(grpCatId: number, typeCatId: number, catId: number) {
    // const payload = { grp_cat_id: grpCatId, type_cat_id: typeCatId }
    return this.http.get<{ status: number, message: string, result: [] }>(`${this.api_url}/get-active-products?grp_cat_id=${grpCatId}&type_cat_id=${typeCatId}&cat_id=${catId}`)
  }
  getActiveProductById(prodId: number) {
    // const payload = { grp_cat_id: grpCatId, type_cat_id: typeCatId }
    return this.http.get<{ status: number, message: string, result: FetchedProduct }>(`${this.api_url}/get-active-product-by-id?product_id=${prodId}`)
  }
}
