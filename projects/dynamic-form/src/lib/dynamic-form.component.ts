import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { EFieldConfigInputType } from './enums/field-config-input-type.enum';
import { EFieldConfigType } from './enums/field-config-type.enum';
import { IFieldConfigForArrayConfig, isFieldConfigForArrayConfig } from './interfaces/field-config-for-array.interface';
import { isFieldConfigForButtonConfig } from './interfaces/field-config-for-button.interface';
import { IFieldConfigForInputConfig, isFieldConfigForInputConfig } from './interfaces/field-config-for-input.interface';
import { IFieldConfigForObjectConfig, isFieldConfigForObjectConfig } from './interfaces/field-config-for-object.interface';
import { IFieldConfigForSelectConfig, isFieldConfigForSelectConfig } from './interfaces/field-config-for-select.interface';
import { isFieldConfigForTextareaConfig } from './interfaces/field-config-for-textarea.interface';
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
    this.formGroup = this.createFormGroup(this.inputFormConfigs, null, this.inputSavedData);
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

  createFormGroup(formConfigs: IFieldConfig[], validatorFn: ValidatorFn[] | null, savedDatas: { [key: string]: any }): FormGroup {
    const group = this.privateFormBuilder.group({});

    formConfigs.forEach(element => {

      switch (element.type) {
        // array can is to render a form in repeative manner
        case EFieldConfigType.Array: {
          // basically it create an empty array group and attach into the main group.
          // later on on the html implementation, it will then apply the rendering in the
          // array form, most likely in a table tag

          // to check if teh config type is comply to interface
          if (!isFieldConfigForArrayConfig(element.type_config)) {
            throw new Error(`${element.name} ${this.wrongInterfaceErrorMessage}`);
          }

          // get the array config
          const arrayConfig = element.type_config as IFieldConfigForArrayConfig;
          const fieldConfigs = arrayConfig.field_configs;

          // we have to render an init row with default value for add row usage
          // if saved data is provided, we have to merge the template with the save datasets
          // if no saved data is provided, we render the init row only, else
          // we render the merge row


          const arrayConfigs: any[] = [];
          if (savedDatas[element.name]) {

            // iterate thru the saved data row
            savedDatas[element.name].forEach((elementSavedData: { [x: string]: any; }) => {
              arrayConfigs.push(this.createFormGroup(fieldConfigs, null, elementSavedData));

              // // iterate thru the field configs
              // arrayConfig.field_configs.forEach(elementFieldConfig => {

              //   let initFieldConfig: IFieldConfig;
              //   initFieldConfig = elementFieldConfig;

              //   if (initFieldConfig.type === EFieldConfigType.Select) {
              //     // abit tricky here, since all combo box has its own array of control for dependable combo setting.
              //     // we need to clone the template configs
              //     // we then iterate all the combo in the combo list, and merge with the value
              //     // last we replace the clone combo list to this merge combo list
              //     initFieldConfig.type_config = this.prepForSelect(initFieldConfig, elementSavedData);
              //   } else {
              //     initFieldConfig.value = elementSavedData[elementFieldConfig.name];
              //   }

              //   // if the field name match the save data property
              //   // initFieldConfig.value = elementSavedData[elementFieldConfig.name];
              //   // if (elementSavedData[elementFieldConfig.name]) {
              //   //   initFieldConfig.value = elementSavedData[elementFieldConfig.name];
              //   // }
              //   datafieldConfigs.push(initFieldConfig);
              // });

              // arrayConfigs.push(this.createFormGroup(datafieldConfigs, null));

            });
          } else {
            // const datafieldConfigs: IFieldConfig[] = [];
            // arrayConfig.field_configs.forEach(elementFieldConfig => {
            //   datafieldConfigs.push(elementFieldConfig);
            // });
            arrayConfigs.push(this.createFormGroup(fieldConfigs, null, {}));
          }



          // arrayConfig.templates.forEach(elementTemplate => {
          //   as.push(this.createFormGroup(elementTemplate.field_configs, null));
          // });

          let subGroup;
          subGroup = this.privateFormBuilder.array(arrayConfigs, element.validation_fn);
          group.addControl(element.name, subGroup);
          // console.log(group);

          break;
        }
        // button & input & text area are single object render
        case EFieldConfigType.Button: {
          // to make sure the type_config is for input
          if (!isFieldConfigForButtonConfig(element.type_config)) {
            throw new Error(`${element.name} ${this.wrongInterfaceErrorMessage}`);
          }
          // all good, apply the control to form
          group.addControl(element.name, this.privateFormBuilder.control({}));
          break;
        }
        case EFieldConfigType.Divider: {
          group.addControl(element.name, this.privateFormBuilder.control({}));
          break;
        }
        case EFieldConfigType.Input: {
          // to make sure the type_config is for input
          if (!isFieldConfigForInputConfig(element.type_config)) {
            throw new Error(`${element.name} ${this.wrongInterfaceErrorMessage}`);
          }
          // to check further if type_config using wronlgy...
          const a = element.type_config as IFieldConfigForInputConfig;
          if (a.type === EFieldConfigInputType.Radio) {
            throw new Error('There is no point having a single radio button, do use array!');
          }
          // all good, apply the control to form
          group.addControl(element.name, this.createControl2(undefined, undefined, savedDatas[element.name]));
          break;
        }
        case EFieldConfigType.Textarea: {
          // to make sure the type_config is for textarea
          if (!isFieldConfigForTextareaConfig(element.type_config)) {
            throw new Error(`${element.name} ${this.wrongInterfaceErrorMessage}`);
          }
          group.addControl(element.name, this.createControl2(undefined, undefined, savedDatas[element.name]));
          break;
        }
        // object render, need to iterate the giving field configs
        case EFieldConfigType.Object: {
          if (!isFieldConfigForObjectConfig(element.type_config)) {
            throw new Error(`${element.name} ${this.wrongInterfaceErrorMessage}`);
          }
          const a = element.type_config as IFieldConfigForObjectConfig;
          let subGroup;
          subGroup = this.createFormGroup(a.field_configs, null, savedDatas[element.name]);
          group.addControl(element.name, subGroup);
          break;
        }

        /**
         * Select render, need to iterate the number of combo boxes if any.
         * Combo box can work independently.
         * Combo box can filter next combo box of N tier,
         * e.g.: Country -> States,
         * Job -> Task => item
         * Workflows -> events -> jobs -> steps -> actions -> runners.
         */
        case EFieldConfigType.Select: {

          if (!isFieldConfigForSelectConfig(element.type_config)) {
            throw new Error(`${element.name} ${this.wrongInterfaceErrorMessage}`);
          }
          const a = this.prepForSelect(element, savedDatas);


          // const a = element.type_config as IFieldConfigForSelectConfig;
          a.controls.forEach(elementControl => {
            group.addControl(elementControl.name, this.createControl2(undefined, undefined, elementControl.value));
          });


          break;
        }
      }

    });

    return group;
  }

  // data and template merging
  private prepForSelect(initFieldConfig: IFieldConfig, elementSavedData: { [x: string]: any; }): IFieldConfigForSelectConfig {
    const templateSelectTypeConfig = initFieldConfig.type_config as IFieldConfigForSelectConfig;
    const templateSelectTypeConfigWithData: IFieldConfigForSelectConfig = { ...templateSelectTypeConfig };
    // // iterate thru the controls
    const theNewComboList: any[] = [];
    templateSelectTypeConfig.controls.forEach(elementCombo => {
      const newCombo = { ...elementCombo };
      newCombo.value = elementSavedData[elementCombo.name] ?? null;
      theNewComboList.push(newCombo);
    });
    templateSelectTypeConfigWithData.controls = theNewComboList;
    return templateSelectTypeConfigWithData;
  }

  createControl2(disabled: boolean | undefined, validationFn: ValidatorFn[] | undefined, value: any): FormControl {
    return this.privateFormBuilder.control({ disabled, value }, validationFn);
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
