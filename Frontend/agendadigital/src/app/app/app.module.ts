import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './router/app-routing.module';
import { AuthInterceptor } from '../login/auth.interceptor';
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule
  ],

  providers: [ { provide: HTTP_INTERCEPTORS, useValue: AuthInterceptor, multi: true }],
  bootstrap: []

})
export class AppModule { }
