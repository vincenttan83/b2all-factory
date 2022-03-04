import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { B2allDynamicFormModule } from 'projects/dynamic-form/src/lib/dynamic-form/dynamic-form.module';
import { ICssClass } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/css-class.interface';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DesignareComponent } from './components/designare/designare.component';
import { DemoComponent } from './components/demo/demo.component';
import { DynamicSectionComponent } from './components/dynamic-section/dynamic-section.component';
import { ProgressSpinnerService } from 'projects/dynamic-form/src/public-api';

// const cssClass: ICssClass = {
//   input: {
//     list: {
//       label: 'mb-1',
//       item: {
//         group: 'form-check', label: 'form-check-label', input: 'form-check-input',
//       },
//     },
//     non_list: {
//       group: 'form-group', label: 'mb-1', input: 'form-control mb-3',
//     },
//   },
//   text_area: {
//     group: 'form-group', label: 'mb-1', input: 'form-control mb-3',
//   },
//   select: {
//     group: 'mb-3', label: 'mb-1', select: 'form-select',
//   },
//   button: {
//     button: 'btn btn-primary',
//   },
//   array: {
//     button: 'btn btn-sm btn-outline-primary', item: 'mb-3', item_label: 'mb-3'
//   },
// };
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MultiSelectComponent,
    DynamicFormComponent,
    DesignareComponent,
    DemoComponent,
    DynamicSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    B2allDynamicFormModule,
  ],
  providers: [
    ProgressSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
