import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-section',
  templateUrl: './dynamic-section.component.html',
  styleUrls: ['./dynamic-section.component.sass']
})
export class DynamicSectionComponent implements OnInit {

  pageTemplateReady = false;
  forms: any[] = [];

  constructor() { }

  ngOnInit(): void {

    this.forms.push({
      content: {
        text: 'why',
        class: 'h4'
      },
      type: 'headings',
    });
    this.forms.push({
      content: {
        form_unique_name: 'form01',
        form_design: [
          {
            name: 'age_group',
            display_text: 'Select your age group:',
            type: 'input',
            type_config: {
              type: 'radio',
              list: true,
              dataset: [
                { key: 'Below 3', value: 'babies' },
                { key: '3 ~ 16', value: 'children' },
                { key: '17 ~ 30', value: 'young_adults' },
                { key: '31 ~ 45', value: 'middle_aged_adults' },
                { key: 'Above 45', value: 'old_adults' }
              ],
              css_class: { group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label' },
            }
          },
          {
            name: 'button_submit',
            display_text: 'Submit button',
            type: 'button',
            type_config: {
              type: 'submit',
              css_class: { group: 'd-grid gap-2 d-md-flex justify-content-md-end my-3', button: 'btn btn-primary' }
            }
          },
        ],
        saved_data: {},
      },
      type: 'form',
    });
    this.forms.push({
      content: {
        form_unique_name: 'form02',
        form_design: [
          {
            name: 'age_group',
            display_text: 'Select your age group:',
            type: 'input',
            type_config: {
              type: 'radio',
              list: true,
              dataset: [
                { key: 'Below 3', value: 'babies' },
                { key: '3 ~ 16', value: 'children' },
                { key: '17 ~ 30', value: 'young_adults' },
                { key: '31 ~ 45', value: 'middle_aged_adults' },
                { key: 'Above 45', value: 'old_adults' }
              ],
              css_class: { group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label' },
            }
          },
          {
            name: 'button_submit',
            display_text: 'Submit button',
            type: 'button',
            type_config: {
              type: 'submit',
              css_class: { group: 'd-grid gap-2 d-md-flex justify-content-md-end my-3', button: 'btn btn-primary' }
            }
          },
        ],
        saved_data: {},
      },
      type: 'form',
    });

    this.pageTemplateReady = true;

  }

  formOnSubmit(val: any): void {
    console.log(val);
  }

  formOnChange(val: any): void {
    console.log(val);
  }

}
