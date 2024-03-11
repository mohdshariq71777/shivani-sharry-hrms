import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { AuthGuard } from './_services/auth-guard.service';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product-list2', component: ProductListComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  // { path: 'product-list/:grp_id/:type_cat_id', component: ProductListComponent },
  // { path: 'product-list2/:grp_id/:type_cat_id', component: ProductListComponent },
  // { path: 'product-list/:grp_id/:type_cat_id/:cat_id', component: ProductListComponent },
  // { path: 'product-list2/:grp_id/:type_cat_id/:cat_id', component: ProductListComponent },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
