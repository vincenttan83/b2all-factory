import { ValidatorFn, FormGroup, FormBuilder, FormControl, AsyncValidatorFn, FormArray } from '@angular/forms';
import { EFieldConfigInputType } from '../enums/field-config-input-type.enum';
import { EFieldConfigType } from '../enums/field-config-type.enum';
import { isFieldConfigForArrayConfig, IArrayConfig } from '../interfaces/field-config-for-array.interface';
import { isFieldConfigForButtonConfig } from '../interfaces/field-config-for-button.interface';
import { IInputConfig } from '../interfaces/field-config-for-input.interface';
import { isFieldConfigForObjectConfig, IObjectConfig } from '../interfaces/field-config-for-object.interface';
import { ISelectConfig, isFieldConfigForSelectConfig } from '../interfaces/field-config-for-select.interface';
import { isFieldConfigForTextareaConfig } from '../interfaces/field-config-for-textarea.interface';
import { IFieldConfig } from '../interfaces/field-config.interface';

export class DynamicFormGenerator {
  wrongInterfaceErrorMessage = 'was using the wrong interface for type_config!';

  constructor(private privateFormBuilder: FormBuilder) { }

  // data and template merging
  private prepForSelect(
    initFieldConfig: IFieldConfig,
    elementSavedData: { [x: string]: any }
  ): ISelectConfig {
    const templateSelectTypeConfig: ISelectConfig = initFieldConfig.type_config;
    const templateSelectTypeConfigWithData: ISelectConfig = {
      ...templateSelectTypeConfig,
    };
    // // iterate thru the controls
    const theNewComboList: any[] = [];
    templateSelectTypeConfig.controls.forEach((elementCombo) => {
      const newCombo = { ...elementCombo };
      if (elementSavedData) {
        newCombo.value = elementSavedData[elementCombo.name] ?? '';
      } else {
        newCombo.value = '';
      }
      theNewComboList.push(newCombo);
    });
    templateSelectTypeConfigWithData.controls = theNewComboList;
    return templateSelectTypeConfigWithData;
  }

  createControl2(
    disabled: boolean | undefined,
    validationFn: ValidatorFn[] | undefined,
    value: any,
    asyncValidationFn: AsyncValidatorFn[] | undefined
  ): FormControl {
    return this.privateFormBuilder.control(
      { disabled, value },
      validationFn,
      asyncValidationFn
    );
  }

  createFormGroup(
    formConfigs: IFieldConfig[],
    validatorFn: ValidatorFn[] | null,
    savedDatas: { [key: string]: any },
    runtimeCounter: number = 0
  ): FormGroup {
    const group = this.privateFormBuilder.group({});

    if (formConfigs && formConfigs.length > 0) {
      formConfigs.forEach((element) => {
        switch (element.type) {
          // array can is to render a form in repeative manner
          case EFieldConfigType.RadioButtonDefault: {
            if (savedDatas && savedDatas[element.name]) {
              group.addControl(
                element.name,
                this.createControl2(undefined, undefined, true, undefined)
              );
            } else {
              group.addControl(
                element.name,
                this.createControl2(undefined, undefined, false, undefined)
              );
            }
            break;
          }
          case EFieldConfigType.Array: {
            // basically it create an empty array group and attach into the main group.
            // later on on the html implementation, it will then apply the rendering in the
            // array form, most likely in a table tag

            // to check if teh config type is comply to interface
            if (!isFieldConfigForArrayConfig(element.type_config)) {
              throw new Error(
                `${element.name} ${this.wrongInterfaceErrorMessage}`
              );
            }

            // get the array config
            const arrayConfig: IArrayConfig = element.type_config;
            const fieldConfigs = arrayConfig.field_configs;

            // we have to render an init row with default value for add row usage
            // if saved data is provided, we have to merge the template with the save datasets
            // if no saved data is provided, we render the init row only, else
            // we render the merge row

            // skip adding after first init
            if (runtimeCounter === 0) {
              if (element.type_config.enable_default_options) {
                element.type_config.enable_default_options.forEach(
                  (elementDefault) => {
                    const defaultField: IFieldConfig = {
                      name: elementDefault.value,
                      type: EFieldConfigType.RadioButtonDefault,
                      type_config: {},
                    };

                    fieldConfigs.push(defaultField);
                  }
                );
              }
            }

            const arrayConfigs: FormGroup[] = [];
            // if having saved data?
            if (savedDatas && savedDatas[element.name]) {
              // iterate thru the saved data row
              savedDatas[element.name].forEach(
                (elementSavedData: { [x: string]: any }) => {
                  arrayConfigs.push(
                    this.createFormGroup(fieldConfigs, null, elementSavedData)
                  );
                }
              );
            } else {
              // render empty row
              arrayConfigs.push(this.createFormGroup(fieldConfigs, null, {}));
            }

            // since it's an array, it should be an object as the property
            const subGroup: FormArray = new FormArray(arrayConfigs, element.validation_fn);
            group.addControl(element.name, subGroup);
            break;
          }
          // button & input & text area are single object render
          case EFieldConfigType.Button: {
            // to make sure the type_config is for input
            if (!isFieldConfigForButtonConfig(element.type_config)) {
              throw new Error(
                `${element.name} ${this.wrongInterfaceErrorMessage}`
              );
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
            // if (!isFieldConfigForInputConfig(element.type_config)) {
            //   throw new Error(
            //     `${element.name} ${this.wrongInterfaceErrorMessage}`
            //   );
            // }

            // to check further if type_config using wrongly...
            const objectTypeConfig: IInputConfig = element.type_config;
            if (
              objectTypeConfig.type !== EFieldConfigInputType.Radio &&
              objectTypeConfig.type !== EFieldConfigInputType.CheckBox
            ) {
              if (objectTypeConfig.list) {
                throw new Error(
                  `The ${element.type} - ${objectTypeConfig.type} error. Set the list to false!`
                );
              }
            }

            // check for list
            if (objectTypeConfig.list) {
              // for checkbox list or radiobutton list
              if (
                objectTypeConfig.type === EFieldConfigInputType.Radio ||
                objectTypeConfig.type === EFieldConfigInputType.CheckBox
              ) {
                if (!objectTypeConfig.dataset) {
                  throw new Error(
                    `The ${element.type} - ${objectTypeConfig.type} required dataset to work properly!`
                  );
                }
                if (objectTypeConfig.dataset?.length === 0) {
                  throw new Error(
                    `The ${element.type} - ${objectTypeConfig.type} required item(s) in dataset to work properly!`
                  );
                }
              }
            } else {
              // if not list, but radiobutton being selected, is wrong!
              if (objectTypeConfig.type === EFieldConfigInputType.Radio) {
                throw new Error(
                  'There is use cases for single radio button control!'
                );
              }
              if (
                objectTypeConfig.dataset &&
                objectTypeConfig.dataset.length > 0
              ) {
                throw new Error(
                  `The ${element.type} - ${objectTypeConfig.type} DO NOT required any dataset!`
                );
              }
            }

            // render the control n value
            if (
              element.type_config.type === EFieldConfigInputType.CheckBox &&
              objectTypeConfig.list
            ) {
              const listofArraySavedItems: string[] = [];
              if (savedDatas && savedDatas[element.name]) {
                if (!Array.isArray(savedDatas[element.name])) {
                  throw new Error('Only accept list of string data type.');
                }
                savedDatas[element.name].forEach((elementSaveItem: string) => {
                  listofArraySavedItems.push(elementSaveItem);
                });
              }
              group.addControl(
                element.name,
                this.privateFormBuilder.array(
                  listofArraySavedItems,
                  element.validation_fn,
                  element.async_validation_fn
                )
              );
            } else {
              if (savedDatas) {
                group.addControl(
                  element.name,
                  this.createControl2(
                    element.disabled,
                    element.validation_fn,
                    savedDatas[element.name],
                    element.async_validation_fn
                  )
                );
              } else {
                group.addControl(
                  element.name,
                  this.createControl2(
                    element.disabled,
                    element.validation_fn,
                    undefined,
                    element.async_validation_fn
                  )
                );
              }
            }
            break;
          }
          case EFieldConfigType.Textarea: {
            // to make sure the type_config is for textarea
            if (!isFieldConfigForTextareaConfig(element.type_config)) {
              throw new Error(
                `${element.name} ${this.wrongInterfaceErrorMessage}`
              );
            }
            if (savedDatas) {
              group.addControl(
                element.name,
                this.createControl2(
                  undefined,
                  element.validation_fn,
                  savedDatas[element.name],
                  element.async_validation_fn
                )
              );
            } else {
              group.addControl(
                element.name,
                this.createControl2(
                  undefined,
                  element.validation_fn,
                  undefined,
                  element.async_validation_fn
                )
              );
            }
            break;
          }
          // object render, need to iterate the giving field configs
          case EFieldConfigType.Object: {
            if (!isFieldConfigForObjectConfig(element.type_config)) {
              throw new Error(
                `${element.name} ${this.wrongInterfaceErrorMessage}`
              );
            }
            const objectTypeConfig =
              element.type_config as IObjectConfig;
            // since it's an object, it should be an object as the property
            let subGroup;
            subGroup = this.createFormGroup(
              objectTypeConfig.field_configs,
              null,
              savedDatas ? savedDatas[element.name] : null
            );
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
              throw new Error(
                `${element.name} ${this.wrongInterfaceErrorMessage}`
              );
            }
            const selectTypeConfig = this.prepForSelect(element, savedDatas);
            selectTypeConfig.controls.forEach((elementControl) => {
              group.addControl(
                elementControl.name,
                this.createControl2(
                  false,
                  elementControl.validation_fn,
                  elementControl.value,
                  element.async_validation_fn
                )
              );
            });
            group.setValidators(element.validation_fn ?? null);
            break;
          }
        }
      });
    } else {
      throw new Error('Template didnt include field config!');
    }

    return group;
  }
}
