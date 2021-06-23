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

  myFields: IFieldConfig[] = [
    {
      name: 'helloworld_button',
      display_text: 'Hello World!',
      type: EFieldConfigType.Button,
      type_config: {
        type: 'button',
        onclick_fn: this.hello,
      }
    },
    {
      name: 'submit_button',
      display_text: 'Submit now!',
      type: EFieldConfigType.Button,
      type_config: {
        type: 'submit',
      }
    },
    {
      name: 'input_name',
      type: EFieldConfigType.Input,
      type_config: {
        type: EFieldConfigInputType.Text,
      }
    }
  ];

  hello(): Promise<void> {
    return of(alert('hello world!')).toPromise();
  }

  async formOnSubmit(formValue: any): Promise<void> {

    console.log(formValue);

  }
}
