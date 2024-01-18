import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Router, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],

  providers: [],
  bootstrap: []

})
export class AppModule { }
