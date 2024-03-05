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
import { AgGridAngular } from 'ag-grid-angular';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupComponent } from './auth/signup/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NumericOnlyDirective,
    LoginComponent,
    ChangePasswordComponent,
    HomePageComponent,
    SignupComponent
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
