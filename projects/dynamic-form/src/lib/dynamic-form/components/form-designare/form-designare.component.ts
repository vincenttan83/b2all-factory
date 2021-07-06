import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getValidators } from '../../classes/custom-validator.class';
import { EFieldConfigInputType } from '../../enums/field-config-input-type.enum';
import { EFieldConfigType } from '../../enums/field-config-type.enum';
import { EFormValidator } from '../../enums/form-validator.enum';
import { IFieldConfigForArrayConfig } from '../../interfaces/field-config-for-array.interface';
import { IFieldConfigForButtonConfig } from '../../interfaces/field-config-for-button.interface';
import { IFieldConfigForInputConfig } from '../../interfaces/field-config-for-input.interface';
import { IFieldConfigForObjectConfig } from '../../interfaces/field-config-for-object.interface';
import { IFieldConfigForSelectConfig } from '../../interfaces/field-config-for-select.interface';
import { IFieldConfig } from '../../interfaces/field-config.interface';

@Component({
  selector: 'b2all-form-designare',
  templateUrl: './form-designare.component.html',
  styleUrls: ['./form-designare.component.css']
})
export class FormDesignareComponent implements OnInit {

  @Input() inputData!: { [key: string]: any };
  @Output() outputFormOnSubmit: EventEmitter<any> = new EventEmitter<any>();

  designareTemplate: IFieldConfig<any>[] = [];
  savedData: { [key: string]: any } = {};

  fields: {
    template: IFieldConfig<
      IFieldConfigForInputConfig |
      IFieldConfigForButtonConfig
    >[],
    saved_data: { [key: string]: any },
  }[] = [];

  constructor() { }

  ngOnInit(): void {

    // generate the multiselect template based on the level received
    // const theTemplate = this.generateTemplate();
    // push the template into the fields stack
    this.designareTemplate.push(this.generateTemplate());
    this.designareTemplate.push(this.generateSubmitButton());
    this.savedData = {
      template: [
        { type: 'input' },
        { type: 'input' },
      ]
    };

  }

  addField(val: string): void {

    let a!: IFieldConfig<any>[];

    switch (val) {
      case EFieldConfigType.Array:
        a = this.getFieldConfigForArrayTemplate();
        break;
      case EFieldConfigType.Button:
        a = this.getFieldConfigForButtonTemplate();
        break;
      case EFieldConfigType.Divider:
        a = this.getFieldConfigForDividerTemplate();
        break;
      case EFieldConfigType.Input:
        a = this.getFieldConfigForInputTemplate();
        break;
      case EFieldConfigType.Object:
        a = this.getFieldConfigForObjectTemplate();
        break;
      case EFieldConfigType.Select:
        a = this.getFieldConfigForSelectTemplate();
        break;
      case EFieldConfigType.Textarea:
        a = this.getFieldConfigForTextareaTemplate();
        break;
    }


    this.fields.push(
      {
        template: [
          ...a,
          this.generateSubmitButton()
        ],
        saved_data: { type: val },
      });
  }

  getFieldConfig(): IFieldConfig<IFieldConfigForInputConfig>[] {
    return [
      {
        name: 'name',
        display_text: 'Field name use as the key field in the database.',
        type: EFieldConfigType.Input,
        validation_fn: getValidators([{ type: EFormValidator.Required }]),
        type_config: {
          type: EFieldConfigInputType.Text,
          list: false,
          css_class: {
            group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
          },
        },
      },
      {
        name: 'display_text',
        display_text: 'Display text of the label, so that user know what to input',
        type: EFieldConfigType.Input,
        type_config: {
          type: EFieldConfigInputType.Text,
          list: false,
          css_class: {
            group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
          },
        },
      },
      {
        name: 'type',
        display_text: 'Field type, is fixed upon the selection.',
        type: EFieldConfigType.Input,
        type_config: {
          readonly: true,
          type: EFieldConfigInputType.Text,
          list: false,
          css_class: {
            group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
          },
        },
      }
    ];
  }

  getFieldConfigForArrayTemplate(): IFieldConfig<IFieldConfigForInputConfig>[] {
    return [
      ...this.getFieldConfig(),
    ];
  }

  getFieldConfigForButtonTemplate(): IFieldConfig<
    IFieldConfigForInputConfig |
    IFieldConfigForObjectConfig<any> |
    any
  >[] {
    return [
      ...this.getFieldConfig(),
      {
        name: 'divider',
        type: EFieldConfigType.Divider,
        type_config: null,
      },
      {
        name: 'type_config',
        display_text: 'Input config:',
        type: EFieldConfigType.Object,
        type_config: {
          field_configs: [
            {
              name: 'type',
              display_text: 'Type, enter only button or submit',
              type: EFieldConfigType.Input,
              type_config: {
                type: EFieldConfigInputType.Text,
                list: false,
                css_class: {
                  group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
                },
              },
            },
            {
              name: 'css_class',
              display_text: 'CSS for button:',
              type: EFieldConfigType.Object,
              type_config: {
                field_configs: [
                  {
                    name: 'group',
                    display_text: 'CSS for button group, such as full width',
                    type: EFieldConfigType.Input,
                    type_config: {
                      type: EFieldConfigInputType.Text,
                      list: false,
                      css_class: {
                        group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
                      },
                    },
                  },
                  {
                    name: 'button',
                    display_text: 'CSS for button itself',
                    type: EFieldConfigType.Input,
                    type_config: {
                      type: EFieldConfigInputType.Text,
                      list: false,
                      css_class: {
                        group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
                      },
                    },
                  },
                ],
                css_class: { group_label: 'h6', content: 'ps-3' },
              },
            }
          ],
          css_class: { group_label: 'h6', content: 'ps-3' },
        },
      }
    ];
  }

  getFieldConfigForDividerTemplate(): IFieldConfig<IFieldConfigForInputConfig>[] {
    return [
      ...this.getFieldConfig(),
    ];
  }

  getFieldConfigForInputTemplate(): IFieldConfig<
    IFieldConfigForInputConfig |
    IFieldConfigForObjectConfig<any>
  >[] {

    const dataSetConfig: IFieldConfigForArrayConfig<any> = {
      table_caption: 'Dataset',
      table_column_names: ['Key', 'Value'],
      field_configs: [
        {
          name: 'key',
          type: EFieldConfigType.Input,
          validation_fn: getValidators([{ type: EFormValidator.Required }]),
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: {
              group: '', group_label: 'form-group', input: 'form-control form-control-sm', input_label: '',
            },
          },
        },
        {
          name: 'value',
          type: EFieldConfigType.Input,
          validation_fn: getValidators([{ type: EFormValidator.Required }]),
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: {
              group: '', group_label: 'form-group', input: 'form-control form-control-sm', input_label: '',
            },
          },
        },
      ],
      css_class: { add_button: 'btn btn-sm btn-primary', del_button: 'btn btn-sm btn-danger', group: '', group_label: '', label: '' }
    };

    const typeSelectionConfig: IFieldConfigForSelectConfig = {
      dataset: [
        { key: 'CheckBox', value: 'checkbox' },
        { key: 'Color', value: 'color' },
        { key: 'Date', value: 'date' },
        { key: 'DateTimeLocal', value: 'datetime-local' },
        { key: 'Email', value: 'email' },
        { key: 'File', value: 'file' },
        { key: 'Month', value: 'month' },
        { key: 'Number', value: 'number' },
        { key: 'Password', value: 'password' },
        { key: 'Radio', value: 'radio' },
        { key: 'Range', value: 'range' },
        { key: 'Text', value: 'text' },
        { key: 'Time', value: 'time' },
        { key: 'Week', value: 'week' },
      ],
      controls: [
        { name: 'type', label: 'Type', key_field: 'key', value_field: 'value', value: '' },
      ],
      css_class: { group: 'mb-2', select: 'form-select form-select-sm', select_label: 'mb-1' }
    };

    const cssClass: IFieldConfigForObjectConfig<IFieldConfigForInputConfig> = {
      field_configs: [
        {
          name: 'group_label',
          display_text: 'Group label',
          type: EFieldConfigType.Input,
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: {
              group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
            },
          },
        },
        {
          name: 'group',
          display_text: 'Group',
          type: EFieldConfigType.Input,
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: {
              group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
            },
          },
        },
        {
          name: 'input_label',
          display_text: 'Input label',
          type: EFieldConfigType.Input,
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: {
              group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
            },
          },
        },
        {
          name: 'input',
          display_text: 'Input',
          type: EFieldConfigType.Input,
          type_config: {
            type: EFieldConfigInputType.Text,
            list: false,
            css_class: {
              group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
            },
          },
        },
      ],
      css_class: { group_label: 'h6', content: 'ps-3' },
    };

    return [
      ...this.getFieldConfig(),
      {
        name: 'type_config',
        display_text: 'Input config:',
        type: EFieldConfigType.Object,
        type_config: {
          field_configs: [
            {
              name: 'type_selection',
              type: EFieldConfigType.Select,
              type_config: typeSelectionConfig,
            },
            {
              name: 'list',
              display_text: 'List',
              type: EFieldConfigType.Input,
              type_config: {
                type: EFieldConfigInputType.CheckBox,
                list: false,
                single_checkbox_display_text: 'Check if is a list',
                css_class: {
                  group: 'form-check mb-2', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
                }
              }
            },
            {
              name: 'readonly',
              display_text: 'Readonly',
              type: EFieldConfigType.Input,
              type_config: {
                type: EFieldConfigInputType.CheckBox,
                list: false,
                single_checkbox_display_text: 'Check if is a readonly field',
                css_class: {
                  group: 'form-check mb-2', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
                }
              }
            },
            {
              name: 'dataset',
              type: EFieldConfigType.Array,
              type_config: dataSetConfig,
            },
            {
              name: 'single_checkbox_display_text',
              display_text: 'For single checkbox description text beside the checkbox',
              type: EFieldConfigType.Input,
              type_config: {
                type: EFieldConfigInputType.Text,
                list: false,
                css_class: {
                  group: 'mb-2', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
                },
              },
            },
            {
              name: 'css_class',
              display_text: 'CSS Class:',
              type: EFieldConfigType.Object,
              type_config: cssClass
            }
          ],
          css_class: { group_label: 'h6', content: 'ps-3' }
        },
      }
    ];
  }

  getFieldConfigForObjectTemplate(): IFieldConfig<IFieldConfigForInputConfig>[] {
    return [
      ...this.getFieldConfig(),
    ];
  }

  getFieldConfigForSelectTemplate(): IFieldConfig<IFieldConfigForInputConfig>[] {
    return [
      ...this.getFieldConfig(),
    ];
  }

  getFieldConfigForTextareaTemplate(): IFieldConfig<IFieldConfigForInputConfig>[] {
    return [
      ...this.getFieldConfig(),
    ];
  }

  formOnSubmitting(val: any, index: number): void {
    console.log(`index of ${index}`);
    console.log(val);


    // this.outputFormOnSubmit.emit(this.recursiveSort(val));
  }

  generateSubmitButton(): IFieldConfig<IFieldConfigForButtonConfig> {
    return {
      name: 'submit',
      display_text: 'Submit',
      type: EFieldConfigType.Button,
      type_config: {
        type: 'submit',
        css_class: {
          button: 'btn btn-sm btn-primary', group: 'mt-1',
        },
      },
    };
  }

  generateTemplate(): IFieldConfig<
    IFieldConfigForArrayConfig<
      IFieldConfigForInputConfig |
      IFieldConfigForSelectConfig |
      IFieldConfigForObjectConfig<
        IFieldConfigForInputConfig |
        IFieldConfigForSelectConfig
      >
    >
  > {

    return {
      name: 'template',
      display_text: 'Template',
      type: EFieldConfigType.Array,
      type_config: {
        table_column_names: ['Name', 'Display Text', 'Type', 'Type Config'],
        field_configs: [
          {
            name: 'name',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: {
                group: '', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
              },
            },
          },
          {
            name: 'display_text',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: {
                group: '', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
              },
            },
          },
          {
            name: 'type',
            type: EFieldConfigType.Input,
            disabled: true,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: {
                group: '', group_label: 'form-group', input: 'form-control form-control-sm', input_label: 'mb-1',
              },
            },
          },
          // {
          //   name: 'type_selection',
          //   type: EFieldConfigType.Select,
          //   type_config: {
          //     dataset: [
          //       { key: 'Array', value: 'array' },
          //       { key: 'Button', value: 'button' },
          //       { key: 'Divider', value: 'divider' },
          //       { key: 'Input', value: 'input' },
          //       { key: 'Object', value: 'object' },
          //       { key: 'Select', value: 'select' },
          //       { key: 'Textarea', value: 'textarea' },
          //     ],
          //     controls: [
          //       { name: 'type', label: '', key_field: 'key', value_field: 'value', value: '' },
          //     ],
          //     css_class: { group: '', select: 'form-select form-select-sm', select_label: 'mb-1' }
          //   },
          // },
          {
            name: 'type_config',
            type: EFieldConfigType.Object,
            type_config: {
              field_configs: [
                {
                  name: 'type_selection',
                  type: EFieldConfigType.Select,
                  type_config: {
                    dataset: [
                      { key: 'CheckBox', value: 'checkbox' },
                      { key: 'Color', value: 'color' },
                      { key: 'Date', value: 'date' },
                      { key: 'DateTimeLocal', value: 'datetime-local' },
                      { key: 'Email', value: 'email' },
                      { key: 'File', value: 'file' },
                      { key: 'Month', value: 'month' },
                      { key: 'Number', value: 'number' },
                      { key: 'Password', value: 'password' },
                      { key: 'Radio', value: 'radio' },
                      { key: 'Range', value: 'range' },
                      { key: 'Text', value: 'text' },
                      { key: 'Time', value: 'time' },
                      { key: 'Week', value: 'week' },
                    ],
                    controls: [
                      { name: 'type', label: 'Type', key_field: 'key', value_field: 'value', value: '' },
                    ],
                    css_class: { group: '', select: 'form-select form-select-sm', select_label: 'mb-1' }
                  },
                },
                {
                  name: 'list',
                  type: EFieldConfigType.Input,
                  type_config: {
                    type: EFieldConfigInputType.CheckBox,
                    list: false,
                    single_checkbox_display_text: 'Check if is a list',
                    css_class: {
                      group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
                    }
                  }
                },
              ],
              css_class: { group_label: '', content: '' }
            }
          }
        ],
        css_class: { add_button: 'btn btn-sm btn-primary', del_button: 'btn btn-sm btn-danger', group: '', group_label: 'h4', label: '' }
      },
    };
  }

}
