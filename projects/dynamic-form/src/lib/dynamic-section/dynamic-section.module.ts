import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDivDirective } from './directives/dynamic-div.directive';
import { DynamicDivButtonComponent } from './components/dynamic-div-button/dynamic-div-button.component';
import { DynamicDivHeadingsComponent } from './components/dynamic-div-headings/dynamic-div-headings.component';
import { DynamicSectionComponent } from './dynamic-section.component';
import { B2allDynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { DynamicDivFormComponent } from './components/dynamic-div-form/dynamic-div-form.component';


/**
 * This module helps system implementation team to focus on entity relationshihp design.
 * The section layout design can be configured and construct with multiple entities.
 * The standard section fall under
 * 1 - listing of records
 * 2 - viewing of signle record
 * 3 - adding a new record
 * 4 - updating the existing record
 * 5 - delete / purge the exisitng record
 * The advance section design fall under
 * 1 - assignment of relationship of the entity data of 1:1, or 1:*
 * 2 - descriptive analytics
 * 3 - list by table
 *   - list by cards
 *   - list by calenday such as appointment
 *   - list by working hours such as job task
 * 4 - search
 * 5 - data uploader
 * 6 - breadcrumb
 * 7 - alert
 * accordion
 * alert
 * breadcrumb
 * actionable button(s)
 * list - card
 * collapse - view more
 * list group
 * modal
 * nav
 * pagination
 * progress
 * spinners
 * toasts
 */

@NgModule({
  declarations: [
    DynamicDivDirective,
    DynamicDivButtonComponent,
    DynamicDivHeadingsComponent,
    DynamicSectionComponent,
    DynamicDivFormComponent
  ],
  imports: [
    CommonModule,
    B2allDynamicFormModule,
  ],
  exports: [
    DynamicSectionComponent,
  ]
})
export class B2allDynamicSectionModule { }
