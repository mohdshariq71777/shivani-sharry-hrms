import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private api_url = `http://localhost:3000/api`;
  constructor(private http: HttpClient, private router: Router) { };
  addGroupCat(grpCatName: string, isActive: boolean) {
    const payload = { group_category_name: grpCatName, is_active: isActive };
    this.http.post<{ status: number, message: string }>(`${this.api_url}/add-group-category`, payload).subscribe(res => { console.log(res) })
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
}
