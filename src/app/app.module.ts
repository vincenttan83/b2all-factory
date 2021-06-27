import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { B2allDynamicFormModule } from 'projects/dynamic-form/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    B2allDynamicFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
