# B2All Factory Library

B2All Factory Library is Angular library that generate form based on configuration.

## Prerequisite

Bootstrap 5.1.3

Angular 12 and above

## Installation

```bash
npm install @b2allsolution/factory
```

## Usage

Import `B2allDynamicFormModule` into `app.module` or selected module.

Add `ProgressSpinnerService` into providers if button is used in configuration.

```typescript
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // import B2allDynamicFormModule
    B2allDynamicFormModule,
  ],
  providers: [
    // add ProgressSpinnerService if button is used
    ProgressSpinnerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Example:

HTML :

```html
<b2all-dynamic-form
  #dynamicForm="b2allDynamicForm"
  [inputFormConfigs]="config"
  [inputSavedData]="savedData"
  [inputFormName]="'form_name'"
  (formOnSubmit)="formOnSubmit($event)"
>
</b2all-dynamic-form>
```

Typescript :

```typescript
this.config: IFieldConfig[] = [
  {
    name: 'full_name',
    display_text: 'Full name: ',
    type: EFieldConfigType.Input,
    validation_fn: getValidators([{ type: EFormValidator.Required }]),
    type_config: {
      type: EFieldConfigInputType.Text,
      list: false,
      css_class: {
        group: 'form-group mb-3',
        group_label: '',
        input: 'form-control',
        input_label: 'mb-1',
      },
    },
    css_class: 'col-12',
  },
];

this.savedData = {
  full_name: 'Daniel'
};

formOnSubmit(formValue: any): Promise<void> {
  console.log(formValue);
}
```

## IFieldConfig Configuration

| Key                  | Type                             | Description                                                   |
| -------------------- | -------------------------------- | ------------------------------------------------------------- |
| name?                | string                           | Name of the field to be store into database as the field name |
| display_text?        | string                           | Display Text for label                                        |
| value?               | any                              | Value of this control, only for single object                 |
| validation_fn?       | ValidatorFn[]                    | Validation for this control                                   |
| async_validation_fn? | AsyncValidatorFn                 | Async validation for this control                             |
| disabled?            | boolean                          | Disabled field (disabled field will not be store when submit) |
| index?               | number                           | For field sorting                                             |
| css_class?           | string                           | For css class                                                 |
| type                 | EFieldConfigType                 | Indicate field type                                           |
| type_config          | [\*](#type_config-configuration) | Futher configuration for specific type (detail is at below)   |

## type_config Configuration

### Input

| Key                           | Type                           | Description                                                                     |
| ----------------------------- | ------------------------------ | ------------------------------------------------------------------------------- |
| readonly?                     | boolean                        | Control become readonly (undefined to disabled readonly)                        |
| type?                         | EFieldConfigInputType          | Input type                                                                      |
| list?                         | boolean                        | For Checkbox and Radio list                                                     |
| dataset?                      | IKeyValueInString[]            | When list is true, this field is use                                            |
| input_helper?                 | boolean                        | ?                                                                               |
| single_checkbox_display_text? | string                         | When list is false and is Checkbox, text will display beside checkbox           |
| css_class?                    | [\*](#css_class-configuration) | Css class                                                                       |
| placeholder?                  | string                         | Placeholder (Optional, if this field has value, display_text will not be shown) |

### Button

| Key           | Type                           | Description  |
| ------------- | ------------------------------ | ------------ |
| type          | 'button' / 'submit'            | Button type  |
| onclick_fn    | () => Promise<void>            | Click Event  |
| loading_text? | string                         | Loading Text |
| css_class?    | [\*](#css_class-configuration) | Css class    |

### Select

| Key       | Type                                   | Description    |
| --------- | -------------------------------------- | -------------- |
| dataset   | IMultiSelect[]                         | Select Dataset |
| controls  | [\*][](#select-controls-configuration) | Select control |
| css_class | [\*](#css_class-configuration)         | CSS class      |

### Array

| Key                      | Type                                          | Description                                  |
| ------------------------ | --------------------------------------------- | -------------------------------------------- |
| hierarchy_level?         | IMultiSelect[]                                | hierarchy                                    |
| field_configs            | [IFieldConfig](#ifieldconfig-configuration)[] | FieldConfig                                  |
| css_class                | [\*](#css_class-configuration)                | CSS class                                    |
| table_column_names?      | string[]                                      | Configuration for recursive enabled template |
| table_column_width?      | string[]                                      | table column width                           |
| table_caption?           | string                                        | table caption                                |
| enable_default_options?  | IKeyValueInString[]                           | default value                                |
| hideAddButton?           | boolean                                       | hide add button flag                         |
| hideRemoveRowItemButton? | boolean                                       | hide remove row item button flag             |

### Object

| Key           | Type                                          | Description |
| ------------- | --------------------------------------------- | ----------- |
| field_configs | [IFieldConfig](#ifieldconfig-configuration)[] | FieldConfig |
| css_class     | [\*](#css_class-configuration)                | CSS class   |

### Textarea

| Key         | Type                           | Description      |
| ----------- | ------------------------------ | ---------------- |
| row_count   | number                         | Number of row    |
| col_count?  | number                         | Number of column |
| readonly    | boolean                        | Read Only flag   |
| css_class   | [\*](#css_class-configuration) | CSS class        |
| placeholder | string                         | placeholder      |

#### Select controls Configuration

| Key           | Type                 | Description                       |
| ------------- | -------------------- | --------------------------------- |
| name          | number               | Name of the control               |
| type?         | 'select' / 'datalist | Type of the control               |
| label?        | string               | Label for the field               |
| key_field     | string               | Key's field name of the dataset   |
| value_field   | string               | Value's field name of the dataset |
| value         | string               | value                             |
| validation_fn | string               | Validation for the selected field |
| disabled      | string               | Disabled selected control         |
| placeholder   | string               | placeholder for the control       |

##### No type_config needed

RadioButtonDefault, Divider

#### css_class Configuration

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
