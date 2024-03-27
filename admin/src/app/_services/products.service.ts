import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { FetchedProduct } from '../models/fetched-product.model';
import { Product } from '../models/product.model';
import { GroupCategory } from '../models/group-category.model';
import { TypeCategory } from '../models/type-category.model';
import { ToastrService } from 'ngx-toastr';
import { FormGroup } from '@angular/forms';
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api_url = `http://localhost:3000/api`;
  private products: FetchedProduct[];
  private productsSub = new BehaviorSubject<null | FetchedProduct[]>(null)
  private groupCategoriesSub = new BehaviorSubject<[]>([])
  private typeCategoriesSub = new BehaviorSubject<[]>([])
  private categoriesSub = new BehaviorSubject<[]>([])
  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { };
  fetchActiveProducts() {
    this.http.get<{ status: number, result: FetchedProduct[], message: string }>(`${this.api_url}/admin/get-all-products`).subscribe(res => {
      this.products = res.result;
      this.productsSub.next(this.products);
    })
  }
  getProductById(id: number) {
    return this.http.get<{ status: number, result: any, message: string }>(`${this.api_url}/admin/get-product-by-id/${id}`)
  }
  fetchActiveProductsUpdateListener() {
    return this.productsSub.asObservable();
  }
  fetchGroupCategoryUpdateListener() {
    return this.groupCategoriesSub.asObservable()
  }
  getTypeCatUpdateListener() {
    return this.typeCategoriesSub.asObservable();
  }
  fetchCategoryUpdateListener() {
    return this.categoriesSub.asObservable()
  }
  addGroupCat(grpCat: GroupCategory) {
    const payload = { group_category_name: grpCat.grpCatName, is_active: grpCat.isActive };
    return this.http.post<{ status: number, message: string }>(`${this.api_url}/admin/add-group-category`, payload)
  }
  getGroupCate() {
    this.http.get<{ status: number, result: any, message: string }>(`${this.api_url}/admin/get-group-categories`).subscribe(response => {
      this.groupCategoriesSub.next(response.result)
    });
  }
  getFilteredGroupCat(payload) {
    this.http.get<{ status: number, result: any, message: string }>(`${this.api_url}/admin/get-filtered-group-categories?from_date=${payload.from_date}&to_date=${payload.to_date}&is_active=${payload.is_active}`).subscribe(response => {
      this.groupCategoriesSub.next(response.result)
    });
  }
  getGroupCatById(id: number) {
    return this.http.get<{ status: number, result: any[], message: string }>(`${this.api_url}/admin/get-group-category/${id}`);
  }
  updateGroupCategory(grpCat: GroupCategory, grpCatId: number) {
    const payload = { group_category_name: grpCat.grpCatName, is_active: grpCat.isActive };
    return this.http.put<{ status: number, result: any[], message: string }>(`${this.api_url}/admin/update-group-category/${grpCatId}`, payload);
  }
  deleteGroupCategory(grpCatId: number) {
    return this.http.delete<{ status: number, result, message: string }>(`${this.api_url}/admin/delete-group-category/${grpCatId}`);
  }
  getActiveGroupCat() {
    return this.http.get<{ status: number, message: string, result: [] }>(`${this.api_url}/admin/get-active-group-categories`)
  }
  addTypeCat(tpCat: TypeCategory) {
    const payload = { group_category_id: tpCat.grpCatId, type_category_name: tpCat.typeCatName, is_active: tpCat.isActive };
    return this.http.post<{ status: number, message: string }>(`${this.api_url}/admin/add-type-category`, payload)
  }
  getTypeCat() {
    this.http.get<{ status: number, result, message: string }>(`${this.api_url}/admin/get-type-categories`).subscribe(response => {
      this.typeCategoriesSub.next(response.result)
    });
  }
  getTypeCatById(typeCatId: number) {
    return this.http.get<{ status: number, result, message: string }>(`${this.api_url}/admin/get-type-category/${typeCatId}`);
  }
  getActiveTypeCat(grpCatId: number) {
    // const payload = { grp_cat_id: grpCatId }
    this.http.get<{ status: number, message: string, result: [] }>(`${this.api_url}/admin/get-active-type-categories?grp_cat_id=${grpCatId}`).subscribe(response => {
      this.typeCategoriesSub.next(response.result)
    })
  }
  getFilteredTypeCat(payload) {
    this.http.get<{ status: number, result: any, message: string }>(`${this.api_url}/admin/get-filtered-type-categories?grp_cat_id=${payload.grp_cat_id}&from_date=${payload.from_date}&to_date=${payload.to_date}&is_active=${payload.is_active}`).subscribe(response => {
      this.typeCategoriesSub.next(response.result)
    });
  }
  deleteTypeCategory(typeCatId: number) {
    return this.http.delete<{ status: number, result, message: string }>(`${this.api_url}/admin/delete-type-category/${typeCatId}`);
  }
  updateTypeCategory(typeCat: TypeCategory, typeCatid: number) {
    const payload = { group_category_id: typeCat.grpCatId, type_category_name: typeCat.typeCatName, is_active: typeCat.isActive };
    return this.http.put<{ status: number, result: any[], message: string }>(`${this.api_url}/admin/update-type-category/${typeCatid}`, payload);
  }
  getCat() {
    this.http.get<{ status: number, result, message: string }>(`${this.api_url}/admin/get-categories`).subscribe(res => {
      this.categoriesSub.next(res.result)
    });
  }
  addCat(cat: Category) {
    const payload = { group_category_id: cat.grpCatId, type_category_id: cat.typeCatId, is_active: cat.isActive, category_name: cat.catName };
    return this.http.post<{ status: number, message: string, result: [] }>(`${this.api_url}/admin/add-category`, payload)
  }
  getActiveCat(grpCatId: number, typeCatId: number) {
    // const payload = { grp_cat_id: grpCatId, type_cat_id: typeCatId }
    return this.http.get<{ status: number, message: string, result: [] }>(`${this.api_url}/admin/get-active-categories?grp_cat_id=${grpCatId}&type_cat_id=${typeCatId}`)
  }
  getCategoryById(catId: number) {
    return this.http.get<{ status: number, result, message: string }>(`${this.api_url}/admin/get-category/${catId}`);
  }
  addProduct(formdata) {
    return this.http.post(`${this.api_url}/admin/add-product`, formdata)
  }
  getFilteredCat(payload) {
    this.http.get<{ status: number, result: any, message: string }>(`${this.api_url}/admin/get-filtered-categories?grp_cat_id=${payload.grp_cat_id ? payload.grp_cat_id : 0}&type_cat_id=${payload.type_cat_id ? payload.type_cat_id : 0}&from_date=${payload.from_date ? payload.from_date : 0}&to_date=${payload.to_date ? payload.to_date : 0}&is_active=${payload.is_active ? payload.is_active : -1}`).subscribe(response => {
      this.categoriesSub.next(response.result)
    });
  }
  deleteCategory(catId: number) {
    return this.http.delete<{ status: number, result, message: string }>(`${this.api_url}/admin/delete-category/${catId}`);
  }
  updateCategory(cat: Category, catId: number) {
    const payload = { group_category_id: cat.grpCatId, type_category_id: cat.typeCatId, cat_name: cat.catName, is_active: cat.isActive };
    return this.http.put<{ status: number, result: any[], message: string }>(`${this.api_url}/admin/update-category/${catId}`, payload);
  }
  deleteProduct(prodId: number) {
    return this.http.delete(`${this.api_url}/admin/delete-product/${prodId}`);
  }
}
