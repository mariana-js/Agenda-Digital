import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
  ],

  providers: [],
  bootstrap: []

})
export class AppModule { }
