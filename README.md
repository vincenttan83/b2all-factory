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

Add `ProgressSpinnerService` into providers.

```typescript
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Import B2allDynamicFormModule
    B2allDynamicFormModule,
  ],
  providers: [
    // Add ProgressSpinnerService
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

## Configuration IFieldConfig

| Field                | Type             | Description                                                   |
| -------------------- | ---------------- | ------------------------------------------------------------- |
| name?                | string           | Name of the field to be store into database as the field name |
| display_text?        | string           | Display Text for label                                        |
| value?               | any              | Value of this control, only for single object                 |
| validation_fn?       | ValidatorFn[]    | Validation for this control                                   |
| async_validation_fn? | AsyncValidatorFn | Async validation for this control                             |
| disabled?            | boolean          | Disabled field (disabled field will not be store when submit) |
| index?               | number           | For field sorting                                             |
| css_class?           | string           | For css class                                                 |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
