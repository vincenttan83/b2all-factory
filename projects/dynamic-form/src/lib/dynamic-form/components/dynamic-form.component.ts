import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { DynamicFormGenerator } from '../classes/dynamic-form-generator.class';
import { EFieldConfigType } from '../enums/field-config-type.enum';
import { IFieldConfig } from '../interfaces/field-config.interface';

@Component({
  exportAs: 'b2allDynamicForm',
  selector: 'b2all-dynamic-form',
  template: `
    <form class="dynamic-form" [formGroup]="formGroup" (ngSubmit)="formOnSubmitting()">

    <div class="row">
      <div *ngFor="let field of inputFormConfigs;" [ngClass]="field.css_class ?? ''">
        <ng-container b2allDynamicField [config]="field" [group]="formGroup">
        </ng-container>
      </div>
    </div>

    </form>
  `,
  styles: [
  ]
})
export class DynamicFormComponent implements OnInit {

  @Input() inputFormConfigs: IFieldConfig<any>[] = [];
  @Input() inputAsyncValidatorFn: AsyncValidatorFn[] = [];
  @Input() removeButtonField = true;
  @Input() removeUndefinedField = true;
  @Input() inputSavedData: { [key: string]: any } = {};

  @Output() formOnSubmit: EventEmitter<any> = new EventEmitter<any>();

  formGroup!: FormGroup;
  wrongInterfaceErrorMessage = 'was using the wrong interface for type_config!';

  get changes(): Observable<any> { return this.formGroup.valueChanges; }
  get dirty(): boolean { return this.formGroup.dirty; }
  get valid(): boolean { return this.formGroup.valid; }
  get value(): any { return this.formGroup.value; }

  constructor(
    private privateFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const dfg: DynamicFormGenerator = new DynamicFormGenerator(this.privateFormBuilder);
    this.formGroup = dfg.createFormGroup(this.inputFormConfigs, null, this.inputSavedData);
  }

  formOnSubmitting(): void {

    let newFormValue: { [keys: string]: any } = {};

    // iterate the formgroup value of key value pairs
    Object.keys(this.formGroup.value).forEach(element => {
      // check if NOT match the name belongs to DIVIDER
      if (!this.inputFormConfigs.some(findX => findX.name === element && findX.type === EFieldConfigType.Divider)) {
        // is not a divider
        // check if NOT match the name belongs to BUTTON
        if (!this.inputFormConfigs.some(findX => findX.name === element && findX.type === EFieldConfigType.Button)) {
          // is not a button
          newFormValue = { ...newFormValue, [element]: this.formGroup.value[element] };
        } else {
          // is a button
          // Default is to remove, any override input param set to false?
          if (!this.removeButtonField) {
            // override setting found, keep it
            newFormValue = { ...newFormValue, [element]: this.formGroup.value[element] };
          }
        }
      }
    });

    let newFormValueCleanForUndefined: { [keys: string]: any } = {};
    // check if required to remove undefined values?
    if (this.removeUndefinedField) {
      // iterate for removing undefined value field
      newFormValueCleanForUndefined = this.removedUndefined(newFormValue, newFormValueCleanForUndefined);
    } else {
      newFormValueCleanForUndefined = { ...newFormValue };
    }

    // fire emit of the new formvalue
    this.formOnSubmit.emit(newFormValueCleanForUndefined);

  }

  removedUndefined(objectWithValue: { [keys: string]: any; }, newFormValueCleanForUndefined: { [keys: string]: any; })
    : { [keys: string]: any; } {
    Object.keys(objectWithValue).forEach(fieldName => {
      // if is array?
      // if is object?
      // else
      if (typeof objectWithValue[fieldName] === 'object') {
        if (Array.isArray(objectWithValue[fieldName])) {
          const oldArray = objectWithValue[fieldName] as any[];
          const cleanArray: any[] = [];
          // iterate then clean
          oldArray.forEach(objectWithValueArrayItem => {
            const newFormValueCleanForUndefinedArray: { [keys: string]: any } = {};
            cleanArray.push(this.removedUndefined(objectWithValueArrayItem, newFormValueCleanForUndefinedArray));
          });

          newFormValueCleanForUndefined = {
            ...newFormValueCleanForUndefined, [fieldName]: cleanArray
          };

        } else {
          const newFormValueCleanForUndefinedObject: { [keys: string]: any } = {};
          newFormValueCleanForUndefined = {
            ...newFormValueCleanForUndefined,
            [fieldName]: this.removedUndefined(objectWithValue[fieldName], newFormValueCleanForUndefinedObject)
          };
        }

      } else if (objectWithValue[fieldName] !== undefined) {
        newFormValueCleanForUndefined = { ...newFormValueCleanForUndefined, [fieldName]: objectWithValue[fieldName] };
      }
    });
    return newFormValueCleanForUndefined;
  }

  markAsPristine(): void {
    this.formGroup.markAsPristine();
  }

  markAsUntouched(): void {
    this.formGroup.markAsUntouched();
  }

}
