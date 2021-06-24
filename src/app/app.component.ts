import { Component } from '@angular/core';
import { EFieldConfigInputType } from 'projects/dynamic-form/src/lib/field-config-input-type.enum';
import { EFieldConfigType } from 'projects/dynamic-form/src/lib/field-config-type.enum';
import { IFieldConfig } from 'projects/dynamic-form/src/lib/field-config.interface';
import { of } from 'rxjs/internal/observable/of';

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
