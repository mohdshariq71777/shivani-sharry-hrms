import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/products.service';
import { Category } from 'src/app/models/category';
import { GroupCategory } from 'src/app/models/group-category';
import { TypeCategory } from 'src/app/models/type-category.model';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private productService: ProductService, private router: Router, private route: ActivatedRoute) { }
  role: number | null = null;
  isAuth: boolean = false;
  loginComp: boolean = true;
  group_categories: GroupCategory[] = [];
  type_categories: TypeCategory[] = [];
  categories: Category[] = [];
  productList: boolean = false;
  ngOnInit(): void {
    this.authService.getAuthrz().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
    this.fetchGroupCategory()
    this.productList = this.route.url['_value'][0]?.path === 'product-list' ? true : false;
  }
  logOut() {
    this.authService.logOut();
  }
  changeToLogin() {
    this.loginComp = true;
  }
  changeToSignup() {
    this.loginComp = false;
  }
  removeBackdrop() {
    if (Array.from(document.querySelectorAll('.offcanvas-backdrop')).length > 1) {
      document.querySelector('.offcanvas-backdrop').remove();
    }
  }
  fetchGroupCategory() {
    this.productService.getActiveGroupCat().subscribe(res => {
      this.group_categories = res.result;
    });
  }
  fetchTypeCatogory(groupCatId: number) {
    this.productService.getActiveTypeCat(groupCatId).subscribe(res => {
      this.type_categories = res.result;
    });
    // this.fetchCatogory(groupCatId,this.type_categories)
  }
  fetchCatogory(groupCatId: number, typeCatId: number) {
    this.productService.getActiveCat(groupCatId, typeCatId).subscribe(res => {
      this.categories = res.result;
    });
  }
  goTo(grp_cat_id_passed: number, type_cat_id_passed: number, cat_id_passed: number) {
    const queryParamObject = {
      grp_cat_id: grp_cat_id_passed,
      type_cat_id: type_cat_id_passed,
      cat_id: cat_id_passed
    }
    const queryParamString = JSON.stringify(queryParamObject);
    const products = btoa(queryParamString)
    if (this.productList) {
      this.router.navigate([`/product-list2`],
        { queryParams: { products } }
      )
      // this.router.navigate(['/product-list2', grp_cat_id, type_cat_id, cat_id])
    }
    else {
      this.router.navigate([`/product-list`],
        { queryParams: { products } }
      )
      // this.router.navigate(['/product-list', grp_cat_id, type_cat_id, cat_id])
    }
  }
}
