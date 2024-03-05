import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { FetchedProduct } from '../models/fetched-product.model';
import { Product } from '../models/product.model';
import { GroupCategory } from '../models/group-category';
import { TypeCategory } from '../models/type-category.model';
import { ToastrService } from 'ngx-toastr';
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
}
