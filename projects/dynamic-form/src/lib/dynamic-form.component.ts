import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicFormGenerator } from './dynamic-form-generator.class';
import { EFieldConfigType } from './enums/field-config-type.enum';
import { IFieldConfig } from './interfaces/field-config.interface';

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
  @Input() inputSavedData: { [key: string]: any } = {};

  @Output() formOnSubmit: EventEmitter<any> = new EventEmitter<any>();

  formGroup!: FormGroup;
  wrongInterfaceErrorMessage = 'was using the wrong interface for type_config!';

  constructor(
    private privateFormBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    const dfg: DynamicFormGenerator = new DynamicFormGenerator(this.privateFormBuilder);
    this.formGroup = dfg.createFormGroup(this.inputFormConfigs, null, this.inputSavedData);
  }

  ngOnChanges(): void {
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

  markAsPristine(): void {
    this.formGroup.markAsPristine();
  }

  markAsUntouched(): void {
    this.formGroup.markAsUntouched();
  }

  // createControl(config: IFieldConfig): FormControl {
  //   const { disabled, validation_fn, value } = config;
  //   return this.privateFormBuilder.control({ disabled, value }, validation_fn);
  // }


}
