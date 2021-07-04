import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() inputHierarchyLevels!: string[];
  @Input() inputData!: { [key: string]: any };
  @Input() inputSubmitButtonTemplate!: IFieldConfig<IFieldConfigForButtonConfig>;
  @Output() outputFormOnSubmit: EventEmitter<any> = new EventEmitter<any>();

  multiSelectTemplate: IFieldConfig<any>[] = [];
  formReady = false;

  constructor() { }

  ngOnInit(): void {

    // generate the multiselect template based on the level received
    const theTemplate = this.generateTemplate(this.inputHierarchyLevels);
    // push the template into the fields stack
    this.multiSelectTemplate.push(theTemplate);
    this.multiSelectTemplate.push(this.inputSubmitButtonTemplate);
    // set the form state to ready so the dynamic form will start rendering
    this.formReady = true;

  }

  formOnSubmitting(val: any): void {
    this.outputFormOnSubmit.emit(this.recursiveSort(val));
  }

  generateTemplate(values: string[]): any {
    let lvlTemplate: any;
    for (let i = values.length - 1; i >= 0; i--) {
      if (i === (values.length - 1)) {
        lvlTemplate = this.generateTemplateForLastLevel(values[i], values.length - 1, i);
      } else {
        lvlTemplate = this.genearteTemplateForLevelHasChildren(values[i], lvlTemplate, values.length - 1, i);
      }
    }
    return lvlTemplate;
  }

  generateTemplateForLastLevel(displayText: string, maxIndex: number, curIndex: number): any {
    return {
      name: 'children',
      display_text: displayText,
      type: EFieldConfigType.Array,
      type_config: {
        hierarchy_level: {
          cur_level: curIndex, max_level: maxIndex,
        },
        field_configs: [
          {
            name: 'key',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control form-control-sm', input_label: '' }
            },
            css_class: 'key-width-non-child'
          },
          {
            name: 'value',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control form-control-sm', input_label: '' }
            },
            css_class: 'val-width-non-child'
          },
        ],
        css_class: {
          add_button: 'btn btn-sm btn-primary',
          del_button: 'btn btn-sm btn-danger',
          group: '',
          group_label: '',
          label: ''
        }
      },
    };
  }

  genearteTemplateForLevelHasChildren(displayText: string, theNextLevelTemplate: any, maxIndex: number, curIndex: number): any {
    return {
      name: 'children',
      display_text: displayText,
      type: EFieldConfigType.Array,
      type_config: {
        hierarchy_level: {
          cur_level: curIndex, max_level: maxIndex,
        },
        field_configs: [
          {
            name: 'key',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control form-control-sm', input_label: '' }
            },
            css_class: 'key-width-has-child'
          },
          {
            name: 'value',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: '', group_label: '', input: 'form-control form-control-sm', input_label: '' }
            },
            css_class: 'val-width-has-child'
          },
          {
            ...theNextLevelTemplate
          }
        ],
        css_class: {
          add_button: 'btn btn-sm btn-primary',
          del_button: 'btn btn-sm btn-danger',
          group: '',
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
