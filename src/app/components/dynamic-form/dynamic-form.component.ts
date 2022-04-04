// tslint:disable: max-line-length
import { Component, OnInit, ViewChild } from '@angular/core';
import { getValidators } from 'projects/dynamic-form/src/lib/dynamic-form/classes/custom-validator.class';
import { EFieldConfigInputType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-input-type.enum';
import { EFieldConfigType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-type.enum';
import { EFormValidator } from 'projects/dynamic-form/src/lib/dynamic-form/enums/form-validator.enum';
import { DynamicFormComponent as dfComponent, DynamicSectionComponent, IFieldConfig } from 'projects/dynamic-form/src/public-api';
import { cs } from 'src/app/country-state';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.sass'],
})
export class DynamicFormComponent implements OnInit {
  @ViewChild('dynamicForm') dfComponent!: dfComponent;

  formDesign: IFieldConfig[] = [];

  savedData: any = {
    full_name: 'Vincent',
    address1: 'No 1, Earth Street',
    country: 'malaysia',
    students: [
      {
        student_first_name: 'vincent',
        student_last_name: 'tan',
        student_gender: 'male',
        result: '1',
        is_focal_point_primary: false,
        is_focal_point_secondary: true,
      },
      {
        student_first_name: 'leon',
        student_last_name: 'loke',
        student_gender: 'female',
        is_focal_point_primary: true,
        is_focal_point_secondary: false,
      },
    ],
    about_yourself: 'Sleeping in his car was never the plan but sometimes things don\'t work out as planned. This had been his life for the last three months and he was just beginning to get used to it. He didn\'t actually enjoy it, but he had accepted it and come to terms with it. Or at least he thought he had. All that changed when he put the key into the ignition, turned it and the engine didn\'t make a sound.',
    favorite_food: ['apples', 'damson_plum', 'bananas'],
    age_group: 'young_adults',
    agreement: true,
    addresses: [
      {
        address: {
          country: 'malaysia',
          state: 'selangor'
        },
        is_billing_and_invoice_address: false,
        is_delivery_address: false
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    this.formDesign = [
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
      {
        name: 'address1',
        display_text: 'Address 1: ',
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
        css_class: 'col-lg-6',
      },
      {
        name: 'address2',
        display_text: 'Address 2: ',
        type: EFieldConfigType.Input,
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
        css_class: 'col-lg-6',
      },
      {
        name: 'country_selection',
        type: EFieldConfigType.Select,
        type_config: {
          dataset: cs,
          controls: [
            {
              name: 'country',
              label: 'Country',
              key_field: 'key',
              value_field: 'value',
              value: '',
              validation_fn: getValidators([
                { type: EFormValidator.Required },
              ]),
            },
            {
              name: 'state',
              label: 'State',
              key_field: 'key',
              value_field: 'value',
              value: '',
            },
            {
              name: 'city',
              label: 'City',
              key_field: 'key',
              value_field: 'value',
              value: '',
            },
          ],
          css_class: {
            group: 'col-12 col-lg-4 mb-3',
            select: 'form-select',
            select_label: 'mb-1',
          },
        },
        css_class: 'col-lg-10',
      },
      {
        name: 'post_code',
        display_text: 'Post code:',
        type: EFieldConfigType.Input,
        validation_fn: getValidators([
          { type: EFormValidator.Min, param: 10000 },
          { type: EFormValidator.Max, param: 99999 },
        ]),
        type_config: {
          type: EFieldConfigInputType.Number,
          list: false,
          css_class: {
            group: 'form-group mb-3',
            group_label: '',
            input: 'form-control',
            input_label: 'mb-1',
          },
        },
        css_class: 'col-lg-2',
      },

      {
        name: 'students',
        display_text: 'List of student',
        type: EFieldConfigType.Array,
        type_config: {
          table_column_names: [
            'First name',
            'Last name',
            'Gender rbtn',
            'Gender',
          ],
          enable_default_options: [
            {
              key: 'Is primary focal point',
              value: 'is_focal_point_primary',
            },
            {
              key: 'Is secondary focal point',
              value: 'is_focal_point_secondary',
            },
          ],
          field_configs: [
            {
              name: 'student_first_name',
              type: EFieldConfigType.Input,
              type_config: {
                type: EFieldConfigInputType.Text,
                list: false,
                css_class: {
                  group: 'form-group',
                  group_label: '',
                  input: 'form-control',
                  input_label: 'mb-1',
                },
              },
            },
            {
              name: 'student_last_name',
              type: EFieldConfigType.Input,
              type_config: {
                type: EFieldConfigInputType.Text,
                list: false,
                css_class: {
                  group: 'form-group',
                  group_label: '',
                  input: 'form-control',
                  input_label: 'mb-1',
                },
              },
            },
            {
              name: 'result',
              // display_text: 'Select your age group:',
              type: EFieldConfigType.Input,
              type_config: {
                type: EFieldConfigInputType.Radio,
                list: true,
                dataset: [
                  { key: '3 Months of 5k KM', value: '0.25' },
                  { key: '6 Months of 5k KM', value: '0.5' },
                  { key: '9 Months of 5k KM', value: '0.75' },
                  { key: '12 Months of 5k KM', value: '1' },
                ],
                // placeholder: 'Select',
                css_class: {
                  group: 'form-check form-check-inline',
                  group_label: '',
                  input: 'form-check-input',
                  input_label: 'form-check-label',
                },
              },
            },

            {
              name: 'student_gender_selection',
              type: EFieldConfigType.Select,
              type_config: {
                dataset: [
                  { key: 'Male', value: 'male' },
                  { key: 'Female', value: 'female' },
                ],
                controls: [
                  {
                    name: 'student_gender',
                    label: '',
                    key_field: 'key',
                    value_field: 'value',
                    value: '',
                    disabled: true,
                  },
                ],
                css_class: {
                  group: '',
                  select: 'form-select',
                  select_label: 'mb-1',
                },
              },
            },
          ],
          css_class: {
            add_button: 'btn btn-sm btn-primary',
            del_button: 'btn btn-sm btn-danger',
            group: '',
            group_label: 'h4',
            label: '',
          },
        },
      },

      {
        name: 'about_yourself',
        display_text: 'About yourself',
        type: EFieldConfigType.Textarea,
        validation_fn: getValidators([
          { type: EFormValidator.Required },
          { type: EFormValidator.MinCount, param: 10 },
        ]),
        type_config: {
          readonly: true,
          row_count: 10,
          css_class: {
            group: 'form-group mb-3',
            input: 'form-control',
            input_label: 'mb-1',
          },
          placeholder: 'About yourself',
        },
        css_class: 'col-12',
      },

      {
        name: 'favorite_food',
        display_text: 'Select your favorite food:',
        type: EFieldConfigType.Input,
        validation_fn: getValidators([
          { type: EFormValidator.MinChecked, param: 3 },
        ]),
        type_config: {
          type: EFieldConfigInputType.CheckBox,
          list: true,
          dataset: [
            { key: 'Apples', value: 'apples' },
            { key: 'Bananas', value: 'bananas' },
            { key: 'Cherries', value: 'cherries' },
            { key: 'Damson plum', value: 'damson_plum' },
          ],
          css_class: {
            group: 'form-check',
            group_label: 'mb-1',
            input: 'form-check-input',
            input_label: 'form-check-label',
          },
        },
        css_class: 'mb-3',
      },

      {
        name: 'age_group',
        display_text: 'Select your age group:',
        type: EFieldConfigType.Input,
        validation_fn: getValidators([{ type: EFormValidator.Required }]),
        type_config: {
          type: EFieldConfigInputType.Radio,
          list: true,
          dataset: [
            { key: 'Below 3', value: 'babies' },
            { key: '3 ~ 16', value: 'children' },
            { key: '17 ~ 30', value: 'young_adults' },
            { key: '31 ~ 45', value: 'middle_aged_adults' },
            { key: 'Above 45', value: 'old_adults' },
          ],
          css_class: {
            group: 'form-check col',
            group_label: 'mb-1',
            input: 'form-check-input',
            input_label: 'form-check-label',
          },
        },
        css_class: 'mb-3',
      },

      {
        name: 'agreement',
        display_text:
          'Before a user can update for the profile, its Terms and Conditions must be agreed to by checking a box:',
        type: EFieldConfigType.Input,
        validation_fn: getValidators([
          { type: EFormValidator.RequiredTrue },
        ]),
        type_config: {
          type: EFieldConfigInputType.CheckBox,
          list: false,
          single_checkbox_display_text: 'I agree',
          css_class: {
            group: 'form-check',
            group_label: 'mb-1',
            input: 'form-check-input',
            input_label: 'form-check-label',
          },
        },
      },
      {
        name: 'button_submit',
        display_text: 'Update profile',
        type: EFieldConfigType.Button,
        type_config: {
          type: 'submit',
          css_class: {
            group: 'd-grid gap-2 d-md-flex justify-content-md-end mt-3',
            button: 'btn btn-primary',
          },
        },
        css_class: 'col-12',
      },
      {
        name: 'addresses',
        display_text: 'Address list',
        type: EFieldConfigType.Array,
        type_config: {
          table_column_names: ['Address'],
          enable_default_options: [
            {
              key: 'Billing and invoice address',
              value: 'is_billing_and_invoice_address',
            },
            { key: 'Delivery address', value: 'is_delivery_address' },
          ],
          field_configs: [
            {
              name: 'address',
              type: EFieldConfigType.Object,
              type_config: {
                field_configs: [
                  ...templateAddress(undefined, cs, 6, 8),
                ],
                css_class: { group_label: '', content: '' },
              },
            },
          ],
          css_class: {
            add_button: 'btn btn-sm btn-primary',
            del_button: 'btn btn-sm btn-danger',
            group: '',
            group_label: 'h4',
            label: '',
          },
        },
      }
    ];
  }

  async formOnSubmit(formValue: any): Promise<void> {
    // you may check further on form data
    if (!formValue.form_data.agreement) {
      alert('Do not try to by pass my validation!');
    }
    console.log(formValue);
  }

  async formOnChange(formValue: any): Promise<void> {
    console.log(formValue);
  }

  async dynamicFormOnSubmit(formValue: any): Promise<void> {
    console.log(formValue);
    this.reset()
  }

  reset(): void {
    this.dfComponent.formReset(this.savedData);
    // this.dfComponent.markAsPristine();
    // this.dfComponent.markAsUntouched();
  }
}

export function templateAddress(readOnly: boolean | undefined, dataset: any, comboBoxSize: number = 6, sectionSize: number = 12): IFieldConfig[] {
  return [
    ...templateStreet(readOnly),
    templateCountryState(readOnly, dataset, comboBoxSize, sectionSize),
    templatePostcode(readOnly),
    templateCity(readOnly),
  ];
}

export function templateStreet(readOnly: boolean | undefined): IFieldConfig[] {
  return [
    {
      name: 'address1',
      display_text: `Address 1:`,
      type: EFieldConfigType.Input,
      // validation_fn: getValidators([{ type: EFormValidator.Required }]),
      disabled: readOnly,
      type_config: {
        readonly: readOnly,
        type: EFieldConfigInputType.Text,
        list: false,
        css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control form-control-sm', input_label: 'mb-1 small' },
        placeholder: 'Address 1',
      },
      css_class: 'col-md-12'
    },
    {
      name: 'address2',
      display_text: `Address 2:`,
      type: EFieldConfigType.Input,
      disabled: readOnly,
      type_config: {
        readonly: readOnly,
        type: EFieldConfigInputType.Text,
        list: false,
        css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control form-control-sm', input_label: 'mb-1 small' },
        placeholder: 'Address 2',
      },
      css_class: 'col-md-12'
    },
  ];
};

export function templatePostcode(readOnly: boolean | undefined): IFieldConfig {
  return {
    name: 'postcode',
    display_text: `Post code:`,
    type: EFieldConfigType.Input,
    // validation_fn: getValidators([{ type: EFormValidator.Required }]),
    disabled: readOnly,
    type_config: {
      readonly: readOnly,
      type: EFieldConfigInputType.Number,
      list: false,
      css_class: { group: 'form-group', group_label: '', input: 'form-control form-control-sm', input_label: 'mb-1 small' },
      // placeholder: 'Post code',
    },
    css_class: 'col-md-6'
  };
}

export function templateCity(readOnly: boolean | undefined): IFieldConfig {
  return {
    name: 'city',
    display_text: `City:`,
    type: EFieldConfigType.Input,
    // validation_fn: getValidators([{ type: EFormValidator.Required }]),
    disabled: readOnly,
    type_config: {
      readonly: readOnly,
      type: EFieldConfigInputType.Text,
      list: false,
      css_class: { group: 'form-group', group_label: '', input: 'form-control form-control-sm', input_label: 'mb-1 small' },
      // placeholder: 'City',
    },
    css_class: 'col-md-6'
  };
}


export function templateCountryState(readOnly: boolean | undefined, dataset: any, comboBoxSize: number = 6, sectionSize: number = 12): IFieldConfig {
  return {
    name: 'country_selection',
    type: EFieldConfigType.Select,
    type_config: {
      dataset,
      controls: [
        {
          name: 'country', label: 'Country', key_field: 'key', value_field: 'value', value: '', placeholder: 'Country', validation_fn: getValidators([{ type: EFormValidator.Required }]), disabled: readOnly,
        },
        { name: 'state', label: 'State', key_field: 'key', value_field: 'value', value: '', placeholder: 'State', disabled: readOnly, },
      ],
      css_class: { group: `col-md-6 mb-3`, select: 'form-select form-select-sm', select_label: 'mb-1 small' }
    },
    css_class: `col-md-12`
  };
}
