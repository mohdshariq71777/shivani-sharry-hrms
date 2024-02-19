import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_services/auth-guard.service';
import { ManageGroupCategoryComponent } from './manage-group-category/manage-group-category.component';
import { ManageTypeCategoryComponent } from './manage-type-category/manage-type-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'manage-group-category', component: ManageGroupCategoryComponent },
  { path: 'manage-type-category', component: ManageTypeCategoryComponent },
  { path: 'manage-category', component: ManageCategoryComponent },
  { path: 'manage-product', component: ManageProductComponent },
  { path: 'home', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
