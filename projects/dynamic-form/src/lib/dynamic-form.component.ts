import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { EFieldConfigInputType } from './field-config-input-type.enum';
import { EFieldConfigType } from './field-config-type.enum';
import { IFieldConfig, IFieldConfigForInputConfig, isFieldConfigForButtonConfig, isFieldConfigForInputConfig } from './field-config.interface';

@Component({
  selector: 'b2all-dynamic-form',
  template: `
    <form class="dynamic-form" [formGroup]="formGroup" (ngSubmit)="formOnSubmitting()">

      <div *ngFor="let field of inputFormConfigs;" [ngClass]="field.ng_class ?? ''">
        <ng-container b2allDynamicField [config]="field" [group]="formGroup">
        </ng-container>
        <br>
      </div>

    </form>
  `,
  styles: [
  ]
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Input() inputFormConfigs: IFieldConfig[] = [];
  @Input() inputAsyncValidatorFn: AsyncValidatorFn[] = [];
  @Input() removeButtonField = true;
  @Input() removeUndefinedField = true;

  @Output() formOnSubmit: EventEmitter<any> = new EventEmitter<any>();

  formGroup!: FormGroup;

  constructor(
    private privateFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.createFormGroup(this.inputFormConfigs, null);
  }

  ngOnChanges(): void {

  }

  formOnSubmitting(): void {

    let newFormValue: { [keys: string]: any } = {};

    // iterate the formgroup value of key value pairs
    Object.keys(this.formGroup.value).forEach(element => {
      // check if match the name belongs to button, try to remove
      if (!this.inputFormConfigs.some(findX => findX.name === element && findX.type === EFieldConfigType.Button)) {
        newFormValue = { ...newFormValue, [element]: this.formGroup.value[element] };
      } else {
        // if is okay to remove? default is remove, any override false?
        if (!this.removeButtonField) {
          newFormValue = { ...newFormValue, [element]: this.formGroup.value[element] };
        }
      }
    });

    let newFormValueCleanForUndefined: { [keys: string]: any } = {};
    // check if required to remove undefined values?
    if (this.removeUndefinedField) {
      // iterate for removing undefined value field
      Object.keys(newFormValue).forEach(element => {
        if (newFormValue[element] !== undefined) {
          newFormValueCleanForUndefined = { ...newFormValueCleanForUndefined, [element]: newFormValue[element] };
        }
      });
    } else {
      newFormValueCleanForUndefined = { ...newFormValue };
    }

    // fire emit of the new formvalue
    this.formOnSubmit.emit(newFormValueCleanForUndefined);

  }

  createFormGroup(formConfigs: IFieldConfig[], validatorFn: ValidatorFn[] | null): FormGroup {
    const group = this.privateFormBuilder.group({});

    formConfigs.forEach(element => {
      switch (element.type) {
        // array can is to render a form in repeative manner
        case EFieldConfigType.Array: {
          break;
        }
        // button & input & text area are single object render
        case EFieldConfigType.Button: {
          // to make sure the type_config is for input
          if (!isFieldConfigForButtonConfig(element.type_config)) {
            throw new Error(`${element.name} Using the wrong interface for type_config!`);
          }
          // all good, apply the control to form
          group.addControl(element.name, this.privateFormBuilder.control({}));
          break;
        }
        case EFieldConfigType.Input: {
          // to make sure the type_config is for input
          if (!isFieldConfigForInputConfig(element.type_config)) {
            throw new Error(`${element.name} Using the wrong interface for type_config!`);
          }
          // to check further if type_config using wronlgy...
          const a = element.type_config as IFieldConfigForInputConfig;
          if (a.type === EFieldConfigInputType.Radio) {
            throw new Error('There is no point having a single radio button, do use array!');
          }
          // all good, apply the control to form
          group.addControl(element.name, this.createControl(element));
          break;
        }
        case EFieldConfigType.Textarea: {
          group.addControl(element.name, this.createControl(element));
          break;
        }
        // object render, need to iterate the giving field configs
        case EFieldConfigType.Object: {
          break;
        }
        // select render, need to iterate the number of combo boxes if any
        case EFieldConfigType.Select: {
          break;
        }
      }

    });

    return group;
  }

  createControl(config: IFieldConfig): FormControl {
    const { disabled, validation_fn, value } = config;
    return this.privateFormBuilder.control({ disabled, value }, validation_fn);
  }

  markAsPristine(): void {
    this.formGroup.markAsPristine();
  }

  markAsUntouched(): void {
    this.formGroup.markAsUntouched();
  }


}
