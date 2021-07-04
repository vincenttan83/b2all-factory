import { Component, OnInit } from '@angular/core';
import { EFieldConfigInputType } from '../../enums/field-config-input-type.enum';
import { EFieldConfigType } from '../../enums/field-config-type.enum';
import { IFieldConfigForArrayConfig } from '../../interfaces/field-config-for-array.interface';
import { IFieldConfigForButtonConfig } from '../../interfaces/field-config-for-button.interface';
import { IFieldConfigForInputConfig } from '../../interfaces/field-config-for-input.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';
import { IMultiSelect } from '../../interfaces/multi-select.interface';

@Component({
  selector: 'b2all-multiselect-dataset',
  templateUrl: './multiselect-dataset.component.html',
  styleUrls: ['./multiselect-dataset.component.css']
})
export class MultiselectDatasetComponent implements OnInit {

  multiSelectTemplate: IFieldConfig<any>[] = [];
  savedData: { [key: string]: any } = {};
  theData: any;
  formReady = false;

  constructor() {

    // const thirdLevelInput: IFieldConfigForArrayConfig<IFieldConfigForInputConfig> = {
    //   field_configs: [
    //     {
    //       name: 'key',
    //       type: EFieldConfigType.Input,
    //       type_config: {
    //         type: EFieldConfigInputType.Text,
    //         list: false,
    //         css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
    //       },
    //       css_class: ''
    //     },
    //     {
    //       name: 'value',
    //       type: EFieldConfigType.Input,
    //       type_config: {
    //         type: EFieldConfigInputType.Text,
    //         list: false,
    //         css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
    //       },
    //       css_class: ''
    //     },
    //   ],
    //   css_class: {
    //     add_button: 'btn btn-primary',
    //     del_button: 'btn btn-primary',
    //     group: 'mb-3',
    //     group_label: '',
    //     label: ''
    //   }
    // };

    // const thirdLevelArray: IFieldConfig<IFieldConfigForArrayConfig<IFieldConfigForInputConfig>> = {
    //   name: 'children',
    //   display_text: 'City',
    //   type: EFieldConfigType.Array,
    //   type_config: thirdLevelInput,
    //   css_class: 'ps-5'
    // };



    // const secondLevelInput: IFieldConfigForArrayConfig<
    //   IFieldConfigForInputConfig |
    //   IFieldConfigForArrayConfig<any>
    // > = {
    //   field_configs: [
    //     {
    //       name: 'key',
    //       type: EFieldConfigType.Input,
    //       type_config: {
    //         type: EFieldConfigInputType.Text,
    //         list: false,
    //         css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
    //       },
    //       css_class: ''
    //     },
    //     {
    //       name: 'value',
    //       type: EFieldConfigType.Input,
    //       type_config: {
    //         type: EFieldConfigInputType.Text,
    //         list: false,
    //         css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
    //       },
    //       css_class: ''
    //     },
    //     {
    //       ...thirdLevelArray
    //     }
    //   ],
    //   css_class: {
    //     add_button: 'btn btn-primary',
    //     del_button: 'btn btn-primary',
    //     group: 'mb-3',
    //     group_label: '',
    //     label: ''
    //   }
    // };

    // const secondLevelArray: IFieldConfig<IFieldConfigForArrayConfig<
    //   IFieldConfigForInputConfig |
    //   IFieldConfigForArrayConfig<any>
    // >> = {
    //   name: 'children',
    //   display_text: 'State',
    //   type: EFieldConfigType.Array,
    //   type_config: secondLevelInput,
    //   css_class: 'ps-5'
    // };

    // const firstLevelInput: IFieldConfigForArrayConfig<
    //   IFieldConfigForInputConfig |
    //   IFieldConfigForArrayConfig<any>
    // > = {
    //   field_configs: [
    //     {
    //       name: 'key',
    //       type: EFieldConfigType.Input,
    //       type_config: {
    //         type: EFieldConfigInputType.Text,
    //         list: false,
    //         css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
    //       },
    //       css_class: ''
    //     },
    //     {
    //       name: 'value',
    //       type: EFieldConfigType.Input,
    //       type_config: {
    //         type: EFieldConfigInputType.Text,
    //         list: false,
    //         css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
    //       },
    //       css_class: ''
    //     },
    //     {
    //       ...secondLevelArray
    //     }
    //   ],
    //   css_class: {
    //     add_button: 'btn btn-primary',
    //     del_button: 'btn btn-primary',
    //     group: 'mb-3',
    //     group_label: '',
    //     label: ''
    //   }
    // };

    // const firstLevelArray: IFieldConfig<IFieldConfigForArrayConfig<
    //   IFieldConfigForInputConfig |
    //   IFieldConfigForArrayConfig<any>
    // >> = {
    //   name: 'children',
    //   display_text: 'Country',
    //   type: EFieldConfigType.Array,
    //   type_config: firstLevelInput,
    // };

    // const submitButton: IFieldConfig<IFieldConfigForButtonConfig> = {
    //   name: 'submit_button',
    //   display_text: 'Submit',
    //   type: EFieldConfigType.Button,
    //   type_config: {
    //     css_class: {
    //       button: 'btn btn-primary',
    //       group: 'mt-3 mb-5'
    //     },
    //     type: 'submit',
    //   }
    // };


    // const b = { ...firstLevelArray };
    // this.multiSelectTemplate.push(b);
    // this.multiSelectTemplate.push(submitButton);

    // this.savedData = {
    //   children: [
    //     {
    //       key: 'Thailand', value: 'thailand', children: [
    //         {
    //           key: 'Bangkok', value: 'bangkok', children: [
    //             { key: 'Phra Nakhon District', value: 'phra_nakhon_district' }
    //           ]
    //         }
    //       ]
    //     },
    //     {
    //       key: 'Malaysia', value: 'malaysia', children: [
    //         {
    //           key: 'Selangor', value: 'selangor', children: [
    //             { key: 'Subang Jaya', value: 'subang_jaya' },
    //             { key: 'Petaling Jaya', value: 'petaling_jaya' },
    //             { key: 'Cyberjaya', value: 'cyberjaya' },
    //           ]
    //         },
    //         {
    //           key: 'Melaka', value: 'melaka', children: [
    //             { key: 'Melaka Tengah', value: 'melaka_tengah' },
    //             { key: 'Aloh Gajah', value: 'aloh_gajah' },
    //           ]
    //         },
    //         {
    //           key: 'Perak', value: 'perak', children: [
    //             { key: 'Ipoh', value: 'ipoh' },
    //             { key: 'Kampar', value: 'kampar' },
    //           ]
    //         },
    //       ]
    //     },
    //     {
    //       key: 'Singapore', value: 'singapore', children: [
    //         {
    //           key: 'Singapore', value: 'singapore', children: [
    //             { key: 'Singapore', value: 'singapore' }
    //           ]
    //         }
    //       ]
    //     },
    //   ]
    // };
  }

  ngOnInit(): void {

    const theTemplate = this.generateTemplate(['Brand', 'Model', 'Code', 'Variant']);
    console.log(theTemplate);


    this.multiSelectTemplate.push(theTemplate);

    const submitButton: IFieldConfig<IFieldConfigForButtonConfig> = {
      name: 'submit_button',
      display_text: 'Submit',
      type: EFieldConfigType.Button,
      type_config: {
        css_class: {
          button: 'btn btn-primary',
          group: 'mt-3 mb-5'
        },
        type: 'submit',
      }
    };
    this.multiSelectTemplate.push(submitButton);

    this.savedData = {
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

    this.formReady = true;

  }

  formOnSubmit(val: IMultiSelect): void {
    this.theData = this.recursiveSort(val);
  }

  generateTemplate(values: string[]): any {
    let lvlTemplate: any;
    for (let i = values.length - 1; i >= 0; i--) {
      if (i === (values.length - 1)) {
        lvlTemplate = this.generateTemplateForLastLevel(values[i]);
      } else {
        lvlTemplate = this.genearteTemplateForLevelHasChildren(values[i], lvlTemplate);
      }
    }
    return lvlTemplate;
  }

  generateTemplateForLastLevel(displayText: string): any {
    return {
      name: 'children',
      display_text: displayText,
      type: EFieldConfigType.Array,
      type_config: {
        field_configs: [
          {
            name: 'key',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
            },
            css_class: ''
          },
          {
            name: 'value',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
            },
            css_class: ''
          },
        ],
        css_class: {
          add_button: 'btn btn-primary',
          del_button: 'btn btn-primary',
          group: 'mb-3',
          group_label: '',
          label: ''
        }
      },
    };
  }

  genearteTemplateForLevelHasChildren(displayText: string, theNextLevelTemplate: any): any {
    return {
      name: 'children',
      display_text: displayText,
      type: EFieldConfigType.Array,
      type_config: {
        field_configs: [
          {
            name: 'key',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
            },
            css_class: ''
          },
          {
            name: 'value',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control', input_label: '' }
            },
            css_class: ''
          },
          {
            ...theNextLevelTemplate
          }
        ],
        css_class: {
          add_button: 'btn btn-primary',
          del_button: 'btn btn-primary',
          group: 'mb-3',
          group_label: '',
          label: ''
        }
      },
    };
  }

  recursiveSort(value: IMultiSelect): IMultiSelect {
    if (value && value.children) {
      const sortedObject: IMultiSelect = { key: value.key, value: value.value, children: this.arrayOfObjectSort(value.children) };
      const newChildren: IMultiSelect[] = [];
      sortedObject.children?.forEach(element => {
        newChildren.push(this.recursiveSort(element));
      });
      return { key: value.key, value: value.value, children: newChildren };
    } else {
      return value;
    }
  }

  arrayOfObjectSort(oriArray: IMultiSelect[]): IMultiSelect[] {
    return oriArray.sort((obj1: IMultiSelect, obje2: IMultiSelect) => {
      if (obj1.key > obje2.key) {
        return 1;
      }
      if (obj1.key < obje2.key) {
        return -1;
      }
      return 0;
    });
  }

}
