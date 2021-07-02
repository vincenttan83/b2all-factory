import { Component, OnInit } from '@angular/core';
import { EFieldConfigInputType } from '../../enums/field-config-input-type.enum';
import { EFieldConfigType } from '../../enums/field-config-type.enum';
import { IFieldConfigForArrayConfig } from '../../interfaces/field-config-for-array.interface';
import { IFieldConfigForInputConfig } from '../../interfaces/field-config-for-input.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';

@Component({
  selector: 'b2all-multiselect-dataset',
  templateUrl: './multiselect-dataset.component.html',
  styleUrls: ['./multiselect-dataset.component.css']
})
export class MultiselectDatasetComponent implements OnInit {

  multiSelectTemplate: IFieldConfig<any>[] = [];
  savedData: { [key: string]: any } = {};

  constructor() {

    const c: IFieldConfigForArrayConfig<IFieldConfigForInputConfig> = {
      field_configs: [
        {
          name: 'key',
          display_text: 'Key',
          type: EFieldConfigType.Input,
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
          },
          css_class: 'col-lg-6'
        },
        {
          name: 'value',
          display_text: 'Value',
          type: EFieldConfigType.Input,
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
          },
          css_class: 'col-lg-6'
        },
      ],
      css_class: { array_item: 'col', add_button: 'btn btn-primary', del_button: 'btn btn-primary', group: 'row', group_label: '', label: '' }
    };

    const b: IFieldConfigForInputConfig = {
      list: true,
      type: EFieldConfigInputType.Text,
      css_class: { group: '', group_label: '', input: '', input_label: '' },
    };

    const a: IFieldConfig<IFieldConfigForArrayConfig<IFieldConfigForInputConfig>> = {
      name: 'dataset',
      type: EFieldConfigType.Array,
      type_config: c,
    };
    this.multiSelectTemplate.push(a);
  }

  ngOnInit(): void {
  }

  formOnSubmit(val: any): void {

  }

}
