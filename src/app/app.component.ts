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
      name: 'input_text',
      display_text: 'Input a text: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Text,
      }
    },
    {
      name: 'input_color',
      display_text: 'Input a color: ',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Color,
      }
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
    {
      name: 'buttn_reset',
      display_text: 'Reset button',
      type: EFieldConfigType.Button,
      type_config: {
        type: 'reset',
      }
    },
  ];

  hello(): Promise<void> {
    return of(alert('hello world!')).toPromise();
  }

  async formOnSubmit(formValue: any): Promise<void> {

    this.returnedValue = formValue;

  }
}
