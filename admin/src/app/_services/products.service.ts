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
    const payload = { group_category_name: grpCatName, isActive: isActive };
    this.http.post<{ status: number, message: string }>(`${this.api_url}/add-group-category`, payload).subscribe(res => { console.log(res) })
  }
}
