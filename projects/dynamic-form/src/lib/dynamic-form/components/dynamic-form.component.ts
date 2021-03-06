import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AsyncValidatorFn, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
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
        <ng-container b2allDynamicField [config]="field" [group]="formGroup" [formName]="inputFormName" [resetEvent]="resetEvent.asObservable()">
        </ng-container>
      </div>
    </div>

    </form>
  `,
  styles: [
  ]
})
export class DynamicFormComponent implements OnChanges {

  // required input
  @Input() inputFormConfigs: IFieldConfig[] = [];
  @Input() inputSavedData: { [key: string]: any } = {};
  @Input() inputFormName!: string;
  // input overridable
  @Input() removeButtonField = true;
  @Input() removeUndefinedField = true;
  // future implement
  @Input() inputAsyncValidatorFn: AsyncValidatorFn[] = []; // yet to implement for the overal form validation!

  @Output() formOnSubmit: EventEmitter<any> = new EventEmitter<any>();

  formGroup!: FormGroup;
  wrongInterfaceErrorMessage = 'was using the wrong interface for type_config!';
  // emit the reset event to children
  resetEvent: Subject<void> = new Subject<void>();

  get changes(): Observable<any> { return this.formGroup.valueChanges; }
  get dirty(): boolean { return this.formGroup.dirty; }
  get valid(): boolean { return this.formGroup.valid; }
  get value(): any { return this.formGroup.value; }

  dfg!: DynamicFormGenerator;

  constructor(
    private privateFormBuilder: FormBuilder
  ) {
    this.dfg = new DynamicFormGenerator(this.privateFormBuilder);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.inputSavedData) {
      this.formGroup = this.dfg.createFormGroup(this.inputFormConfigs, null, this.inputSavedData);
    }
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
            if (typeof objectWithValueArrayItem === 'object') {
              const newFormValueCleanForUndefinedArray: { [keys: string]: any } = {};
              cleanArray.push(this.removedUndefined(objectWithValueArrayItem, newFormValueCleanForUndefinedArray));
            } else {
              cleanArray.push(objectWithValueArrayItem);
            }
          });

          newFormValueCleanForUndefined = {
            ...newFormValueCleanForUndefined, [fieldName]: cleanArray
          };

        } else {
          const newFormValueCleanForUndefinedObject: { [keys: string]: any } = {};
          newFormValueCleanForUndefined = {
            ...newFormValueCleanForUndefined,
            [fieldName]: this.removedUndefined(objectWithValue[fieldName] ?? {}, newFormValueCleanForUndefinedObject)
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

  formReset(value?: any): void {
    if (value) {
      // generally reset once first
      this.formGroup.reset(value);
      this.resetEvent.next();
      // iterate the configuration of fields to check if there is any array field type array
      Object.keys(this.formGroup.value).forEach(key => {
        if (Array.isArray(this.formGroup.value[key])) {
          // snap as a variable for control later
          const fa = (this.formGroup.controls[key] as FormArray);
          // do a clean up, this will remove all rows
          fa.clear();
          // create the from group again, this will return 
          // a form group with form array and each item in the array is a form group (3 level down!)
          const fg = this.dfg.createFormGroup(this.inputFormConfigs.filter(i => i.name === key) ?? [], null, value, 1);
          (fg.controls[key] as FormArray).controls.forEach(newFg => {
            // catch the lowest level array item (the form group) and push to the form array
            fa.push(newFg);
          });
        }
      });
      // this.inputFormConfigs.forEach(element => {
      //   if (element.type === EFieldConfigType.Array) {
      //     // snap as a variable for control later
      //     const fa = (this.formGroup.controls[element.name] as FormArray);
      //     // do a clean up, this will remove all rows
      //     fa.clear();
      //     // create the from group again, this will return 
      //     // a form group with form array and each item in the array is a form group (3 level down!)
      //     const fg = this.dfg.createFormGroup([element], null, value, 1);
      //     (fg.controls[element.name] as FormArray).controls.forEach(newFg => {
      //       // catch the lowest level array item (the form group) and push to the form array
      //       fa.push(newFg);
      //     });
      //   }
      // });
    }
  }

}
