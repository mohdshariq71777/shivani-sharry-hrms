import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { FetchedProduct } from '../models/fetched-product.model';
import { Product } from '../models/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api_url = `http://localhost:3000/api`;
  private products: FetchedProduct[];
  private productsSub = new BehaviorSubject<null | FetchedProduct[]>(null)
  constructor(private http: HttpClient, private router: Router) { };
  fetchActiveProducts() {
    this.http.get<{ status: number, result: FetchedProduct[], message: string }>(`${this.api_url}/get-all-active-products`).subscribe(res => {
      this.products = res.result;
      this.productsSub.next(this.products);
    })
  }
  fetchActiveProductsUpdateListener() {
    return this.productsSub.asObservable();
  }
  addGroupCat(grpCatName: string, isActive: boolean) {
    const payload = { group_category_name: grpCatName, is_active: isActive };
    this.http.post<{ status: number, message: string }>(`${this.api_url}/add-group-category`, payload).subscribe(res => { console.log(res) })
  }

  getGroupCate(): Observable<any> {
    return this.http.get<any>(`${this.api_url}/get-group-category`).pipe(map((result: any) => result));

  }
  getActiveGroupCat() {
    return this.http.get<{ status: number, message: string, result: [] }>(`${this.api_url}/get-active-group-category`)
  }
  addTypeCat(grpCatId: number, typeCatName: string, isActive: boolean) {
    const payload = { group_category_id: grpCatId, type_category_name: typeCatName, is_active: isActive };
    this.http.post<{ status: number, message: string }>(`${this.api_url}/add-type-category`, payload).subscribe(res => { console.log(res) })
  }
  getActiveTypeCat(grpCatId: number) {
    const payload = { grp_cat_id: grpCatId }
    return this.http.post<{ status: number, message: string, result: [] }>(`${this.api_url}/get-active-type-category`, payload)
  }
  addCat(grpCatId: number, typeCatId: number, isActive: boolean, catName: string) {
    const payload = { group_category_id: grpCatId, type_category_id: typeCatId, is_active: isActive, category_name: catName };
    this.http.post<{ status: number, message: string, result: [] }>(`${this.api_url}/add-category`, payload).subscribe(res => { console.log(res) })
  }
  getActiveCat(grpCatId: number, typeCatId: number) {
    const payload = { grp_cat_id: grpCatId, type_cat_id: typeCatId }
    return this.http.post<{ status: number, message: string, result: [] }>(`${this.api_url}/get-active-category`, payload)
  }
  addProduct(product: Product) {
    const product_payload = {
      group_category_id: product.grpCatId,
      type_category_id: product.typeCatId,
      is_active: product.isActive,
      category_id: product.catId,
      product_name: product.productName,
      product_price: product.price,
      description: product.description
    };
    this.http.post<{ status: number, message: string, result: [] }>(`${this.api_url}/add-product`, product_payload).subscribe(res => {
      this.fetchActiveProducts();
    })
  }
}
