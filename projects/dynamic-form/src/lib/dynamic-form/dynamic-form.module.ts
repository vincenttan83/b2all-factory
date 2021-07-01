import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './components/dynamic-form.component';

import { DynamicFieldInputComponent } from './components/dynamic-field-input/dynamic-field-input.component';
import { DynamicFieldTextareaComponent } from './components/dynamic-field-textarea/dynamic-field-textarea.component';
import { DynamicFieldObjectComponent } from './components/dynamic-field-object/dynamic-field-object.component';
import { DynamicFieldSelectComponent } from './components/dynamic-field-select/dynamic-field-select.component';
import { DynamicFieldArrayComponent } from './components/dynamic-field-array/dynamic-field-array.component';
import { DynamicFieldButtonComponent } from './components/dynamic-field-button/dynamic-field-button.component';
import { DynamicFieldDividerComponent } from './components/dynamic-field-divider/dynamic-field-divider.component';

import { ICssClass } from './interfaces/css-class.interface';

import { DynamicFieldDirective } from './directives/dynamic-field.directive';

import { DynamicSectionComponent } from './components/dynamic-section.component';
import { DynamicDivDirective } from './directives/dynamic-div.directive';

import { DynamicDivButtonComponent } from './components/dynamic-div-button/dynamic-div-button.component';
import { DynamicDivHeadingsComponent } from './components/dynamic-div-headings/dynamic-div-headings.component';
import { DynamicDivFormComponent } from './components/dynamic-div-form/dynamic-div-form.component';



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
    DynamicFieldDividerComponent,
    DynamicSectionComponent,
    DynamicDivDirective,
    DynamicDivButtonComponent,
    DynamicDivHeadingsComponent,
    DynamicDivFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent,
    DynamicSectionComponent,
  ]
})
export class B2allDynamicFormModule { }

// Temporary NOT required
// export class B2allDynamicFormModule {
//   static forRoot(config: ICssClass): ModuleWithProviders<B2allDynamicFormModule> {
//     return {
//       ngModule: B2allDynamicFormModule,
//       providers: [
//         { provide: 'css_class', useValue: config },
//       ],
//     };
//   }
// }
