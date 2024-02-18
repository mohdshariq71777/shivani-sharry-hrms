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
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageGroupCategoryComponent } from './manage-group-category/manage-group-category.component';
import { ManageTypeCategoryComponent } from './manage-type-category/manage-type-category.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { AgGridAngular } from 'ag-grid-angular';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NumericOnlyDirective,
    LoginComponent,
    ChangePasswordComponent,
    DashboardComponent,
    ManageGroupCategoryComponent,
    ManageTypeCategoryComponent,
    ManageCategoryComponent,
    ManageProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AgGridAngular,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule
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
