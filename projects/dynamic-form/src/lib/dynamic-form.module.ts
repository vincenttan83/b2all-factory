import { NgModule } from '@angular/core';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { DynamicFieldInputComponent } from './components/dynamic-field-input/dynamic-field-input.component';
import { DynamicFieldTextareaComponent } from './components/dynamic-field-textarea/dynamic-field-textarea.component';
import { DynamicFieldObjectComponent } from './components/dynamic-field-object/dynamic-field-object.component';
import { DynamicFieldSelectComponent } from './components/dynamic-field-select/dynamic-field-select.component';
import { DynamicFieldArrayComponent } from './components/dynamic-field-array/dynamic-field-array.component';
import { DynamicFieldButtonComponent } from './components/dynamic-field-button/dynamic-field-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    DynamicFieldInputComponent,
    DynamicFieldTextareaComponent,
    DynamicFieldObjectComponent,
    DynamicFieldSelectComponent,
    DynamicFieldArrayComponent,
    DynamicFieldButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
