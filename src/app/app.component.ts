import { Component } from '@angular/core';
import { EFieldConfigInputType } from 'projects/dynamic-form/src/lib/enums/field-config-input-type.enum';
import { EFieldConfigType } from 'projects/dynamic-form/src/lib/enums/field-config-type.enum';
import { IFieldConfig } from 'projects/dynamic-form/src/lib/interfaces/field-config.interface';
import { of } from 'rxjs/internal/observable/of';
import { countries, cs } from './country-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'b2all-factory';
  returnedValue: any;

  myFields: IFieldConfig[] = [
    {
      name: 'input_color',
      display_text: 'Input a color: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Color,
      }
    },
    {
      name: 'input_date',
      display_text: 'Input a date: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Date,
      }
    },
    {
      name: 'input_datetime_local',
      display_text: 'Input a datetime local: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.DateTimeLocal,
      }
    },
    {
      name: 'input_email',
      display_text: 'Input a email: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Email,
      }
    },
    {
      name: 'input_file',
      display_text: 'Input a file: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.File,
      }
    },
    {
      name: 'input_month',
      display_text: 'Input a month: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Month,
      }
    },
    {
      name: 'input_number',
      display_text: 'Input a number: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Number,
      }
    },
    {
      name: 'input_password',
      display_text: 'Input a password: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Password,
      }
    },
    // {
    //   name: 'input_radio',
    //   display_text: 'Input a radio: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Radio,
    //   }
    // },
    {
      name: 'input_range',
      display_text: 'Input a range: ',
      value: 90,
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Range,
      }
    },
    {
      name: 'input_text',
      display_text: 'Input a text: ',
      value: 'haha',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Text,
      }
    },
    {
      name: 'input_time',
      display_text: 'Input a time: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Time,
      }
    },
    {
      name: 'input_week',
      display_text: 'Input a week: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Week,
      }
    },
    {
      name: 'divider_input',
      type: EFieldConfigType.Divider,
      type_config: null,
    },
    {
      name: 'text_area',
      display_text: 'Text area: ',
      value: 'Start your long winded story here!\n\nlol',
      type: EFieldConfigType.Textarea,
      type_config: {
        row_count: 5,
        // col_count: 10,
      }
    },
    {
      name: 'divider_textarea',
      type: EFieldConfigType.Divider,
      type_config: null,
    },
    {
      name: 'country_selection',
      type: EFieldConfigType.Select,
      type_config: {
        dataset: cs,
        controls: [
          { name: 'country_selection_country', label: 'Country', key_field: 'key', value_field: 'value', value: null },
          { name: 'country_selection_state', label: 'State', key_field: 'key', value_field: 'value', value: null },
          { name: 'country_selection_city', label: 'City', key_field: 'key', value_field: 'value', value: null },
        ]
      },
    },
    {
      name: 'country_to',
      type: EFieldConfigType.Select,
      type_config: {
        dataset: cs,
        controls: [
          { name: 'country_to_country', label: 'Country', key_field: 'key', value_field: 'value', value: 'singapore' },
          { name: 'country_to_state', label: 'State', key_field: 'key', value_field: 'value', value: 'singapore' },
          { name: 'country_to_city', label: 'City', key_field: 'key', value_field: 'value', value: null },
        ]
      },
    },
    {
      name: 'gender_selection',
      type: EFieldConfigType.Select,
      type_config: {
        dataset: [
          { key: 'Male', value: 'male' },
          { key: 'Female', value: 'female' },
        ],
        controls: [
          { name: 'gender_selection_gender', label: 'Gender', key_field: 'key', value_field: 'value', value: null },
        ]
      },
    },
    // {
    //   name: 'country_selections',
    //   type: EFieldConfigType.Select,
    //   type_config: {
    //     dataset: cs,
    //     controls: [
    //       { name: 'select_country', label: 'Country', key_field: 'key', value_field: 'value', value: 'singapore' },
    //       { name: 'select_state', label: 'State', key_field: 'key', value_field: 'value', value: 'singapore' },
    //       { name: 'select_city', label: 'City', key_field: 'key', value_field: 'value', value: 'singapore' },
    //     ]
    //   },
    // },
    {
      name: 'divider_select',
      type: EFieldConfigType.Divider,
      type_config: null,
    },
    {
      name: 'array_something',
      type: EFieldConfigType.Array,
      type_config: null,
    },
    {
      name: 'divider_array',
      type: EFieldConfigType.Divider,
      type_config: null,
    },
    {
      name: 'object_something',
      type: EFieldConfigType.Object,
      type_config: {
        field_configs: [
          {
            name: 'object_something_input_text_firstname',
            display_text: 'Input your first name: ',
            value: 'haha',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
            }
          },
          {
            name: 'object_something_input_text_last',
            display_text: 'Input your last name: ',
            value: 'haha',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
            }
          },
          {
            name: 'gender_selection_profile',
            type: EFieldConfigType.Select,
            type_config: {
              dataset: [
                { key: 'Male', value: 'male' },
                { key: 'Female', value: 'female' },
              ],
              controls: [
                { name: 'gender_selection_profile_gender', label: 'Gender', key_field: 'key', value_field: 'value', value: null },
              ]
            },
          },
        ]
      },
    },
    {
      name: 'divider_object',
      type: EFieldConfigType.Divider,
      type_config: null,
    },
    {
      name: 'button_hello',
      display_text: 'Fire local method',
      type: EFieldConfigType.Button,
      type_config: {
        type: 'button',
        onclick_fn: this.hello,
      }
    },
    {
      name: 'button_submit',
      display_text: 'Submit button',
      type: EFieldConfigType.Button,
      type_config: {
        type: 'submit',
      }
    },
    // {
    //   name: 'buttn_reset',
    //   display_text: 'Reset button',
    //   type: EFieldConfigType.Button,
    //   type_config: {
    //     type: 'reset',
    //   }
    // },
  ];

  hello(): Promise<void> {
    return of(alert('hello world!')).toPromise();
  }

  async formOnSubmit(formValue: any): Promise<void> {

    this.returnedValue = formValue;

  }
}
