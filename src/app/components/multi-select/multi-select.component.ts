import { Component, OnInit } from '@angular/core';
import { EFieldConfigType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-type.enum';
import { IFieldConfigForButtonConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-button.interface';
import { IFieldConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config.interface';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.sass']
})
export class MultiSelectComponent implements OnInit {

  multiselectHierarchyLevels: string[] = ['Country', 'State'];
  multiselectData: { [key: string]: any } = {
    children: [
      {
        key: 'Thailand', value: 'thailand', children: [
          {
            key: 'Bangkok', value: 'bangkok', children: [
              { key: 'Phra Nakhon District', value: 'phra_nakhon_district' }
            ]
          }
        ]
      },
      {
        key: 'Malaysia', value: 'malaysia', children: [
          {
            key: 'Selangor', value: 'selangor', children: [
              { key: 'Subang Jaya', value: 'subang_jaya' },
              { key: 'Petaling Jaya', value: 'petaling_jaya' },
              { key: 'Cyberjaya', value: 'cyberjaya' },
            ]
          },
          {
            key: 'Melaka', value: 'melaka', children: [
              { key: 'Melaka Tengah', value: 'melaka_tengah' },
              { key: 'Aloh Gajah', value: 'aloh_gajah' },
            ]
          },
          {
            key: 'Perak', value: 'perak', children: [
              { key: 'Ipoh', value: 'ipoh' },
              { key: 'Kampar', value: 'kampar' },
            ]
          },
        ]
      },
      {
        key: 'Singapore', value: 'singapore', children: [
          {
            key: 'Singapore', value: 'singapore', children: [
              { key: 'Singapore', value: 'singapore' }
            ]
          }
        ]
      },
    ]
  };
  multiselectSubmitButtonTemplate: IFieldConfig<IFieldConfigForButtonConfig> = {
    name: 'submit_button',
    display_text: 'Submit',
    type: EFieldConfigType.Button,
    type_config: {
      type: 'submit',
      css_class: { group: 'd-grid gap-2 d-md-flex justify-content-md-end mt-3', button: 'btn btn-primary' }
    },
    css_class: 'col-12'
  };

  constructor() { }

  ngOnInit(): void {
  }

  formOnSubmitMultiselect(val: any): void {
    console.log(val);
  }

  formOnChangeMultiselect(val: any): void {
    console.log(val);
  }
}
