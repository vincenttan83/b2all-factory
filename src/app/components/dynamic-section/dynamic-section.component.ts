import { Component, OnInit } from '@angular/core';
import { getValidators } from 'projects/dynamic-form/src/lib/dynamic-form/classes/custom-validator.class';
import { EFieldConfigInputType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-input-type.enum';
import { EFieldConfigType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-type.enum';
import { EFormValidator } from 'projects/dynamic-form/src/lib/dynamic-form/enums/form-validator.enum';
import { IDivConfigForButton } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-button.interface';
import { IDivConfigForForm } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-form.interface';
import { IDivConfigForHeadings } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-headings.interface';
import {
  EDivConfigType,
  IDivConfig,
} from 'projects/dynamic-form/src/public-api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dynamic-section',
  templateUrl: './dynamic-section.component.html',
  styleUrls: ['./dynamic-section.component.sass'],
})
export class DynamicSectionComponent implements OnInit {
  pageTemplateReady = false;
  forms: IDivConfig<
    IDivConfigForButton[] | IDivConfigForForm<any> | IDivConfigForHeadings
  >[] = [];

  protected isLoadingSubjects: Subject<boolean>[] = [];
  constructor() {}

  ngOnInit(): void {
    this.forms.push({
      content: [
        {
          class: 'btn btn-primary me-3',
          disabled: false,
          text: 'Print Quote',
          onclick: 'print_quote',
          onclick_fn: () => null,
          custom_option: {
            hello: 'this is quote',
          },
          subscription:
            this.isLoadingSubjects[
              this.isLoadingSubjects.push(new Subject()) - 1
            ],
        },
        {
          class: 'btn btn-primary',
          disabled: false,
          text: 'Print Billing',
          onclick: 'print_billing',
          onclick_fn: () => null,
          custom_option: {
            hello: 'this is billing',
          },
          subscription:
            this.isLoadingSubjects[
              this.isLoadingSubjects.push(new Subject()) - 1
            ],
        },
      ],
      type: EDivConfigType.Button,
    });

    this.forms.push({
      content: {
        text: 'why',
        class: 'h4',
      },
      type: EDivConfigType.Headings,
    });
    this.forms.push({
      content: {
        form_unique_name: 'form01',
        form_design: [
          {
            name: 'age_group',
            display_text: 'Select your age group:',
            type: EFieldConfigType.Input,
            type_config: {
              type: 'radio',
              list: true,
              dataset: [
                { key: 'Below 3', value: 'babies' },
                { key: '3 ~ 16', value: 'children' },
                { key: '17 ~ 30', value: 'young_adults' },
                { key: '31 ~ 45', value: 'middle_aged_adults' },
                { key: 'Above 45', value: 'old_adults' },
              ],
              css_class: {
                group: 'form-check',
                group_label: 'mb-1',
                input: 'form-check-input',
                input_label: 'form-check-label',
              },
            },
          },
          {
            name: 'button_submit',
            display_text: 'Submit button',
            type: EFieldConfigType.Button,
            type_config: {
              type: 'submit',
              css_class: {
                group: 'd-grid gap-2 d-md-flex justify-content-md-end my-3',
                button: 'btn btn-primary',
              },
            },
          },
        ],
        saved_data: {},
      },
      type: EDivConfigType.Form,
    });
    this.forms.push({
      content: {
        form_unique_name: 'form02',
        form_design: [
          {
            name: 'age_group',
            display_text: 'Select your age group:',
            type: EFieldConfigType.Input,
            type_config: {
              type: 'radio',
              list: true,
              dataset: [
                { key: 'Below 3', value: 'babies' },
                { key: '3 ~ 16', value: 'children' },
                { key: '17 ~ 30', value: 'young_adults' },
                { key: '31 ~ 45', value: 'middle_aged_adults' },
                { key: 'Above 45', value: 'old_adults' },
              ],
              css_class: {
                group: 'form-check',
                group_label: 'mb-1',
                input: 'form-check-input',
                input_label: 'form-check-label',
              },
            },
          },
          {
            name: 'button_submit',
            display_text: 'Submit button',
            type: EFieldConfigType.Button,
            type_config: {
              type: 'submit',
              css_class: {
                group: 'd-grid gap-2 d-md-flex justify-content-md-end my-3',
                button: 'btn btn-primary',
              },
            },
          },
        ],
        saved_data: {},
      },
      type: EDivConfigType.Form,
    });
    this.forms.push({
      content: {
        form_unique_name: 'form03',
        form_design: [
          {
            name: 'service_order_jobs',
            display_text: 'List of service order jobs',
            type: EFieldConfigType.Array,
            type_config: {
              hierarchy_level: {
                cur_level: 0,
                max_level: 0,
              },
              table_column_names: ['Job order', 'Job order details'],
              table_column_width: ['256px', '1024px'],
              // hideAddButton: true,
              // hideRemoveRowItemButton: true,
              field_configs: [
                {
                  name: 'service_order_job_header',
                  type: EFieldConfigType.Object,
                  type_config: {
                    field_configs: [
                      {
                        name: 'service_order_job_type_code',
                        display_text: `Job type:`,
                        type: EFieldConfigType.Input,
                        type_config: {
                          readonly: true,
                          type: EFieldConfigInputType.Text,
                          list: false,
                          css_class: {
                            group: 'form-group mb-1',
                            group_label: '',
                            input: 'form-control form-control-sm',
                            input_label: 'mb-1 small',
                          },
                        },
                      },
                      {
                        name: 'operation_code',
                        display_text: `Operation code:`,
                        type: EFieldConfigType.Input,
                        type_config: {
                          readonly: true,
                          type: EFieldConfigInputType.Text,
                          list: false,
                          css_class: {
                            group: 'form-group mb-1',
                            group_label: '',
                            input: 'form-control form-control-sm',
                            input_label: 'mb-1 small',
                          },
                        },
                      },
                      {
                        name: 'name',
                        display_text: `Job:`,
                        type: EFieldConfigType.Input,
                        validation_fn: getValidators([
                          { type: EFormValidator.Required },
                        ]),
                        type_config: {
                          type: EFieldConfigInputType.Text,
                          list: false,
                          css_class: {
                            group: 'form-group mb-1',
                            group_label: '',
                            input: 'form-control form-control-sm',
                            input_label: 'mb-1 small',
                          },
                        },
                      },
                      {
                        name: 'mechanic',
                        display_text: `Mechanic:`,
                        type: EFieldConfigType.Input,
                        validation_fn: getValidators([
                          { type: EFormValidator.Required },
                        ]),
                        type_config: {
                          type: EFieldConfigInputType.Text,
                          list: false,
                          css_class: {
                            group: 'form-group mb-1',
                            group_label: '',
                            input: 'form-control form-control-sm',
                            input_label: 'mb-1 small',
                          },
                        },
                      },
                      {
                        name: 'remark',
                        display_text: 'Remark',
                        type: EFieldConfigType.Textarea,
                        // validation_fn: getValidators([{ type: EFormValidator.Required }, { type: EFormValidator.MinCount, param: 10 }]),
                        type_config: {
                          row_count: 5,
                          css_class: {
                            group: 'form-group mb-3',
                            group_label: '',
                            input: 'form-control',
                            input_label: 'mb-1',
                          },
                        },
                        css_class: 'col-12',
                      },
                    ],
                    css_class: { group_label: '', content: '' },
                  },
                },

                {
                  name: 'service_order_job_detail',
                  display_text: 'List of job details',
                  type: EFieldConfigType.Array,
                  type_config: {
                    table_column_names: [
                      'Task / Item',
                      'Estimated amount',
                      'Expected qty',
                    ],
                    table_column_width: ['800px', '174px', '50px'],
                    // hideAddButton: true,
                    // hideRemoveRowItemButton: true,
                    field_configs: [
                      {
                        name: 'name',
                        type: EFieldConfigType.Input,
                        validation_fn: getValidators([
                          { type: EFormValidator.Required },
                        ]),
                        type_config: {
                          type: EFieldConfigInputType.Text,
                          list: false,
                          css_class: {
                            group: 'form-group',
                            group_label: '',
                            input: 'form-control form-control-sm',
                            input_label: 'mb-1 small',
                          },
                        },
                      },
                      {
                        name: 'estimated_amount',
                        type: EFieldConfigType.Input,
                        validation_fn: getValidators([
                          { type: EFormValidator.Required },
                        ]),
                        type_config: {
                          type: EFieldConfigInputType.Number,
                          list: false,
                          css_class: {
                            group: 'form-group',
                            group_label: '',
                            input: 'form-control form-control-sm',
                            input_label: 'mb-1 small',
                          },
                        },
                      },
                      {
                        name: 'expected_quantity',
                        type: EFieldConfigType.Input,
                        validation_fn: getValidators([
                          { type: EFormValidator.Required },
                        ]),
                        type_config: {
                          type: EFieldConfigInputType.Number,
                          list: false,
                          css_class: {
                            group: 'form-group',
                            group_label: '',
                            input: 'form-control form-control-sm',
                            input_label: 'mb-1 small',
                          },
                        },
                      },
                    ],
                    // tslint:disable-next-line: max-line-length
                    css_class: {
                      add_button: 'btn btn-sm btn-primary',
                      del_button: 'btn btn-sm btn-danger',
                      group: '',
                      group_label: 'h4',
                      label: '',
                    },
                  },
                },
              ],
              css_class: {
                add_button: 'btn btn-sm btn-primary',
                del_button: 'btn btn-sm btn-danger',
                group: '',
                group_label: 'h4',
                label: '',
              },
            },
          },
          {
            name: 'age_group',
            display_text: 'Select your age group:',
            type: EFieldConfigType.Input,
            type_config: {
              type: 'radio',
              list: true,
              dataset: [
                { key: 'Below 3', value: 'babies' },
                { key: '3 ~ 16', value: 'children' },
                { key: '17 ~ 30', value: 'young_adults' },
                { key: '31 ~ 45', value: 'middle_aged_adults' },
                { key: 'Above 45', value: 'old_adults' },
              ],
              css_class: {
                group: 'form-check',
                group_label: 'mb-1',
                input: 'form-check-input',
                input_label: 'form-check-label',
              },
            },
          },
          {
            name: 'button_submit',
            display_text: 'Submit button',
            type: EFieldConfigType.Button,
            type_config: {
              type: 'submit',
              css_class: {
                group: 'd-grid gap-2 d-md-flex justify-content-md-end my-3',
                button: 'btn btn-primary',
              },
            },
          },
        ],
        saved_data: {},
      },
      type: EDivConfigType.Form,
    });

    this.pageTemplateReady = true;
  }

  formOnSubmit(val: any): void {
    console.log(val);
  }

  formOnChange(val: any): void {
    console.log(val);
  }

  async buttonOnSubmit(val: any): Promise<void> {
    this.isLoadingSubjects[val.button_index].next(true);
    await this.sleep(2000);
    this.isLoadingSubjects[val.button_index].next(false);
  }

  async sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
}
