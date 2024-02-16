import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AuthGuard } from './_services/auth-guard.service';
import { AddGroupCategoryComponent } from './add-group-category/add-group-category.component';
import { AddTypeCategoryComponent } from './add-group-category copy/add-type-category.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'add-group-category', component: AddGroupCategoryComponent, canActivate: [AuthGuard] },
  { path: 'add-type-category', component: AddTypeCategoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
