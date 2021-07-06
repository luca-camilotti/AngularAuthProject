import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { SigninComponent } from './unprotected/signin/signin.component';
import { SignupComponent } from './unprotected/signup/signup.component';
import { ProtectedComponent } from './protected/protected/protected.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './shared/toast/toast.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthTokenInterceptorService } from './services/auth-token-interceptor.service';
import { HttpErrorInterceptorService } from './services/http-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    ProtectedComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
