import { Component, OnInit } from '@angular/core';
import { getValidators } from 'projects/dynamic-form/src/lib/dynamic-form/classes/custom-validator.class';
import { EDivConfigType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/div-config-type.enum';
import { EFieldConfigInputType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-input-type.enum';
import { EFieldConfigType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-type.enum';
import { EFormValidator } from 'projects/dynamic-form/src/lib/dynamic-form/enums/form-validator.enum';
import { IDivConfigForForm } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-form.interface';
import { IDivConfigForHeadings } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-headings.interface';
import { IDivConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config.interface';
import { IFieldConfigForArrayConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-array.interface';
import { IFieldConfigForButtonConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-button.interface';
import { IFieldConfigForInputConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-input.interface';
import { IFieldConfigForSelectConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-select.interface';
import { IFieldConfigForTextareaConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-textarea.interface';
import { cs } from 'src/app/country-state';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.sass']
})
export class DynamicFormComponent implements OnInit {

  sectionConfigs = new Array<IDivConfig<IDivConfigForHeadings | IDivConfigForForm<any>>>(2);

  constructor() { }

  ngOnInit(): void {

    this.sectionConfigs[0] = {
      content: {
        text: 'Profile info',
        class: 'h3'
      },
      type: EDivConfigType.Headings,
    };

    this.sectionConfigs[1] = this.myTemplateWithData({

    });


  }

  myTemplateWithData(data: any): IDivConfig<
    IDivConfigForForm<
      IFieldConfigForInputConfig | IFieldConfigForSelectConfig | IFieldConfigForButtonConfig |
      IFieldConfigForTextareaConfig | IFieldConfigForArrayConfig<any>
    >
  > {

    return {
      content: {
        form_unique_name: 'form01',
        form_design: [
          {
            name: 'full_name',
            display_text: 'Full name: ',
            type: EFieldConfigType.Input,
            validation_fn: getValidators([{ type: EFormValidator.Required }]),
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' },
            },
            css_class: 'col-12'
          },
          {
            name: 'address1',
            display_text: 'Address 1: ',
            type: EFieldConfigType.Input,
            validation_fn: getValidators([{ type: EFormValidator.Required }]),
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-lg-6'
          },
          {
            name: 'address2',
            display_text: 'Address 2: ',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-lg-6'
          },
          {
            name: 'country_selection',
            type: EFieldConfigType.Select,
            type_config: {
              dataset: cs,
              controls: [
                {
                  name: 'country', label: 'Country', key_field: 'key', value_field: 'value', value: '',
                  validation_fn: getValidators([{ type: EFormValidator.Required }]),
                },
                { name: 'state', label: 'State', key_field: 'key', value_field: 'value', value: '' },
                { name: 'city', label: 'City', key_field: 'key', value_field: 'value', value: '' },
              ],
              css_class: { group: 'col-12 col-lg-4 mb-3', select: 'form-select', select_label: 'mb-1' }
            },
            css_class: 'col-lg-10'
          },
          {
            name: 'post_code',
            display_text: 'Post code:',
            type: EFieldConfigType.Input,
            validation_fn: getValidators([{ type: EFormValidator.Min, param: 10000 }, { type: EFormValidator.Max, param: 99999 }]),
            type_config: {
              type: EFieldConfigInputType.Number,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-lg-2'
          },

          {
            name: 'students',
            display_text: 'List of student',
            type: EFieldConfigType.Array,
            type_config: {
              table_column_names: ['First name', 'Last name', 'Gender'],
              field_configs: [
                {
                  name: 'student_first_name',
                  type: EFieldConfigType.Input,
                  type_config: {
                    type: EFieldConfigInputType.Text,
                    list: false,
                    css_class: { group: 'form-group', group_label: '', input: 'form-control', input_label: 'mb-1' },
                  },
                },
                {
                  name: 'student_last_name',
                  type: EFieldConfigType.Input,
                  type_config: {
                    type: EFieldConfigInputType.Text,
                    list: false,
                    css_class: { group: 'form-group', group_label: '', input: 'form-control', input_label: 'mb-1' },
                  }
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
                      { name: 'student_gender', label: '', key_field: 'key', value_field: 'value', value: null },
                    ],
                    css_class: { group: '', select: 'form-select', select_label: 'mb-1' }
                  },
                },
              ],
              css_class: { add_button: 'btn btn-sm btn-primary', del_button: 'btn btn-sm btn-danger', group: '', group_label: 'h4', label: '' }
            },
          },


          {
            name: 'about_yourself',
            display_text: 'About yourself',
            type: EFieldConfigType.Textarea,
            validation_fn: getValidators([{ type: EFormValidator.Required }, { type: EFormValidator.MinCount, param: 10 }]),
            type_config: {
              row_count: 10,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-12'
          },

          {
            name: 'favorite_food',
            display_text: 'Select your favorite food:',
            type: EFieldConfigType.Input,
            validation_fn: getValidators([{ type: EFormValidator.MinChecked, param: 3 }]),
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
                group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
              }
            },
            css_class: 'mb-3'
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
                { key: 'Above 45', value: 'old_adults' }
              ],
              css_class: {
                group: 'form-check col', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
              }
            },
            css_class: 'mb-3'
          },


          {
            name: 'agreement',
            display_text: 'Before a user can update for the profile, its Terms and Conditions must be agreed to by checking a box:',
            type: EFieldConfigType.Input,
            validation_fn: getValidators([{ type: EFormValidator.RequiredTrue }]),
            type_config: {
              type: EFieldConfigInputType.CheckBox,
              list: false,
              single_checkbox_display_text: 'I agree',
              css_class: {
                group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
              }
            }
          },
          {
            name: 'button_submit',
            display_text: 'Update profile',
            type: EFieldConfigType.Button,
            type_config: {
              type: 'submit',
              css_class: { group: 'd-grid gap-2 d-md-flex justify-content-md-end mt-3', button: 'btn btn-primary' }
            },
            css_class: 'col-12'
          },
        ],
        saved_data: data,
      },
      type: EDivConfigType.Form,
    };
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


}
