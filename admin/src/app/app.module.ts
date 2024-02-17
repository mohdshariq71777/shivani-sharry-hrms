import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { NumericOnlyDirective } from './numeric-only.directive';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptor } from './_services/auth-interceptor.service';
import { AuthGuard } from './_services/auth-guard.service';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddGroupCategoryComponent } from './add-group-category/add-group-category.component';
import { AddTypeCategoryComponent } from './add-type-category/add-type-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ManageProductComponent } from './manage-product/manage-product.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NumericOnlyDirective,
    LoginComponent,
    ChangePasswordComponent,
    ProductListComponent,
    AddGroupCategoryComponent,
    AddTypeCategoryComponent,
    AddCategoryComponent,
    ManageProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridAngular
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
