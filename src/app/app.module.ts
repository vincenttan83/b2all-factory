import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormModule } from 'projects/dynamic-form/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
