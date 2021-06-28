import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';

import { DynamicFieldInputComponent } from './components/dynamic-field-input/dynamic-field-input.component';
import { DynamicFieldTextareaComponent } from './components/dynamic-field-textarea/dynamic-field-textarea.component';
import { DynamicFieldObjectComponent } from './components/dynamic-field-object/dynamic-field-object.component';
import { DynamicFieldSelectComponent } from './components/dynamic-field-select/dynamic-field-select.component';
import { DynamicFieldArrayComponent } from './components/dynamic-field-array/dynamic-field-array.component';
import { DynamicFieldButtonComponent } from './components/dynamic-field-button/dynamic-field-button.component';
import { DynamicFieldDividerComponent } from './components/dynamic-field-divider/dynamic-field-divider.component';

import { ICssClass } from './interfaces/css-class.interface';

import { DynamicFieldDirective } from './directives/dynamic-field.directive';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    DynamicFieldInputComponent,
    DynamicFieldTextareaComponent,
    DynamicFieldObjectComponent,
    DynamicFieldSelectComponent,
    DynamicFieldArrayComponent,
    DynamicFieldButtonComponent,
    DynamicFieldDividerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class B2allDynamicFormModule {
  static forRoot(config: ICssClass): ModuleWithProviders<B2allDynamicFormModule> {
    return {
      ngModule: B2allDynamicFormModule,
      providers: [
        { provide: 'css_class', useValue: config },
      ],
    };
  }
}
