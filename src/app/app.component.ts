import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EFieldConfigInputType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-input-type.enum';
import { EFieldConfigType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/field-config-type.enum';
import { IFieldConfigForArrayConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-array.interface';
import { IFieldConfigForButtonConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-button.interface';
import { IFieldConfigForInputConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-input.interface';
import { IFieldConfigForObjectConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-object.interface';
import { IFieldConfigForSelectConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-select.interface';
import { IFieldConfigForTextareaConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config-for-textarea.interface';
import { IFieldConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/field-config.interface';
import { EDivConfigType } from 'projects/dynamic-form/src/lib/dynamic-form/enums/div-config-type.enum';
import { IDivConfig } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config.interface';
import { of } from 'rxjs/internal/observable/of';
import { cs } from './country-state';
import { IDivConfigForHeadings } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-headings.interface';
import { IDivConfigForButton } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-button.interface';
import { IDivConfigForForm } from 'projects/dynamic-form/src/lib/dynamic-form/interfaces/div-config-for-form.interface';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'b2all-factory';
  returnedValue: any;

  // @ViewChild(DynamicFormComponent) dynamicForm!: DynamicFormComponent;
  // @ViewChild(DynamicSectionComponent) dynamicSection!: DynamicSectionComponent;

  // savedData: { [key: string]: any } = {
  //   accepted_agreement: true,
  //   age_group: 'middle_aged_adults',
  //   favorite_food: ['bananas', 'cherries'],
  //   students: [
  //     {
  //       student_first_name: 'Vincent',
  //       student_last_name: 'Tan',
  //       student_gender: 'female',
  //     },
  //     {
  //       student_first_name: 'Leon',
  //       student_last_name: 'Loke',
  //       student_gender: 'male',
  //     }
  //   ],
  //   profile: {
  //     first_name: 'Vince',
  //     last_name: 'Tan',
  //     interest: {
  //       primary: 'Cycling',
  //       secondary: 'Swimming',
  //     },
  //   },
  //   country: 'malaysia',
  //   state: 'selangor',
  //   city: 'cyberjaya',
  //   summary: 'Start your long winded story here!\n\nlol',
  // };

  // savedData2: { [key: string]: any } = {
  //   accepted_agreement: false,
  //   age_group: 'middle_aged_adults',
  //   favorite_food: ['bananas', 'cherries'],
  //   students: [
  //     {
  //       student_first_name: 'Vincent',
  //       student_last_name: 'Tan',
  //       student_gender: 'female',
  //     },
  //   ],
  //   profile: {
  //     first_name: 'Vince',
  //     last_name: 'Tan',
  //     interest: {
  //       primary: 'Cycling',
  //       secondary: 'Swimming',
  //     },
  //   },
  //   country: 'malaysia',
  //   state: 'selangor',
  //   city: 'cyberjaya',
  //   summary: 'huat ar',
  // };


  // // for the field configs
  // agreementAcceptanceControl: IFieldConfig<IFieldConfigForInputConfig> = {
  //   name: 'accepted_agreement',
  //   display_text: 'I hereby giving the consent to bla bla bla to process my personal data.',
  //   type: EFieldConfigType.Input,
  //   type_config: {
  //     type: EFieldConfigInputType.CheckBox,
  //     list: false,
  //     single_checkbox_display_text: 'I agree',
  //     css_class: {
  //       group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
  //     }
  //   }
  // };
  // ageGroupControl: IFieldConfig<IFieldConfigForInputConfig> = {
  //   name: 'age_group',
  //   display_text: 'Select your age group:',
  //   type: EFieldConfigType.Input,
  //   type_config: {
  //     type: EFieldConfigInputType.Radio,
  //     list: true,
  //     dataset: [
  //       { key: 'Below 3', value: 'babies' },
  //       { key: '3 ~ 16', value: 'children' },
  //       { key: '17 ~ 30', value: 'young_adults' },
  //       { key: '31 ~ 45', value: 'middle_aged_adults' },
  //       { key: 'Above 45', value: 'old_adults' }
  //     ],
  //     css_class: {
  //       group: 'form-check col', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
  //     }
  //   },
  // };
  // favoriteFoodControl: IFieldConfig<IFieldConfigForInputConfig> = {
  //   name: 'favorite_food',
  //   display_text: 'Select your favorite food:',
  //   type: EFieldConfigType.Input,
  //   type_config: {
  //     type: EFieldConfigInputType.CheckBox,
  //     list: true,
  //     dataset: [
  //       { key: 'Apples', value: 'apples' },
  //       { key: 'Bananas', value: 'bananas' },
  //       { key: 'Cherries', value: 'cherries' },
  //       { key: 'Damson plum', value: 'damson_plum' },
  //     ],
  //     css_class: {
  //       group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
  //     }
  //   }
  // };
  // countrySelectionControl: IFieldConfig<IFieldConfigForSelectConfig> = {
  //   name: 'country_selection',
  //   type: EFieldConfigType.Select,
  //   type_config: {
  //     dataset: cs,
  //     controls: [
  //       { name: 'country', label: 'Country', key_field: 'key', value_field: 'value', value: null },
  //       { name: 'state', label: 'State', key_field: 'key', value_field: 'value', value: null },
  //       { name: 'city', label: 'City', key_field: 'key', value_field: 'value', value: null },
  //     ],
  //     css_class: {
  //       group: 'col-12 col-md-4 mb-3', select_label: 'mb-1', select: 'form-select',
  //     },
  //   },
  // };
  // dividerControl: IFieldConfig<null> = {
  //   name: 'divider_select',
  //   type: EFieldConfigType.Divider,
  //   type_config: null,
  // };

  // studentArrayControl: IFieldConfig<IFieldConfigForArrayConfig<IFieldConfigForInputConfig | IFieldConfigForSelectConfig>> = {
  //   name: 'students',
  //   display_text: 'List of student',
  //   type: EFieldConfigType.Array,
  //   type_config: {
  //     field_configs: [
  //       {
  //         name: 'student_first_name',
  //         display_text: 'Input your first name: ',
  //         type: EFieldConfigType.Input,
  //         type_config: {
  //           type: EFieldConfigInputType.Text,
  //           list: false,
  //           css_class: {
  //             group: 'form-group', group_label: '', input: 'form-control mb-3', input_label: 'mb-1'
  //           }
  //         },
  //       },
  //       {
  //         name: 'student_last_name',
  //         display_text: 'Input your last name: ',
  //         type: EFieldConfigType.Input,
  //         type_config: {
  //           type: EFieldConfigInputType.Text,
  //           list: false,
  //           css_class: {
  //             group: 'form-group', group_label: '', input: 'form-control mb-3', input_label: 'mb-1'
  //           }
  //         }
  //       },
  //       {
  //         name: 'student_gender_selection',
  //         display_text: 'Gender',
  //         type: EFieldConfigType.Select,
  //         type_config: {
  //           dataset: [
  //             { key: 'Male', value: 'male' },
  //             { key: 'Female', value: 'female' },
  //           ],
  //           controls: [
  //             { name: 'student_gender', label: 'Gender', key_field: 'key', value_field: 'value', value: null },
  //           ],
  //           css_class: {
  //             group: 'col-12 col-md-6 mb-3', select_label: 'mb-1', select: 'form-select',
  //           },
  //         },
  //       },
  //     ],

  //   },
  // };

  // profileControl: IFieldConfig<
  //   IFieldConfigForObjectConfig<
  //     IFieldConfigForInputConfig |
  //     IFieldConfigForObjectConfig<
  //       IFieldConfigForInputConfig
  //     >
  //   >
  // > = {
  //     name: 'profile',
  //     display_text: 'About yourself',
  //     type: EFieldConfigType.Object,
  //     type_config: {
  //       field_configs: [
  //         {
  //           name: 'first_name',
  //           display_text: 'Input your first name: ',
  //           type: EFieldConfigType.Input,
  //           type_config: {
  //             type: EFieldConfigInputType.Text,
  //             list: false,
  //             css_class: {
  //               group: 'form-group', group_label: '', input: 'form-control mb-3', input_label: 'mb-1'
  //             }
  //           }
  //         },
  //         {
  //           name: 'last_name',
  //           display_text: 'Input your last name: ',
  //           type: EFieldConfigType.Input,
  //           type_config: {
  //             type: EFieldConfigInputType.Text,
  //             list: false,
  //             css_class: {
  //               group: 'form-group', group_label: '', input: 'form-control mb-3', input_label: 'mb-1'
  //             }
  //           }
  //         },
  //         {
  //           name: 'interest',
  //           display_text: 'Interest / Hobby',
  //           type: EFieldConfigType.Object,
  //           type_config: {
  //             field_configs: [
  //               {
  //                 name: 'primary',
  //                 display_text: 'Input your primary interest: ',
  //                 type: EFieldConfigType.Input,
  //                 type_config: {
  //                   type: EFieldConfigInputType.Text,
  //                   list: false,
  //                   css_class: {
  //                     group: 'form-group', group_label: '', input: 'form-control mb-3', input_label: 'mb-1'
  //                   }
  //                 }
  //               },
  //               {
  //                 name: 'secondary',
  //                 display_text: 'Input your secondary interest: ',
  //                 type: EFieldConfigType.Input,
  //                 type_config: {
  //                   type: EFieldConfigInputType.Text,
  //                   list: false,
  //                   css_class: {
  //                     group: 'form-group', group_label: '', input: 'form-control mb-3', input_label: 'mb-1'
  //                   }
  //                 }
  //               },
  //             ]
  //           },
  //         },
  //       ]
  //     },
  //   };

  // summaryControl: IFieldConfig<IFieldConfigForTextareaConfig> = {
  //   name: 'summary',
  //   display_text: 'Summary: ',
  //   type: EFieldConfigType.Textarea,
  //   type_config: {
  //     row_count: 5,
  //     col_count: 30,
  //   }
  // };
  // buttonControl: IFieldConfig<IFieldConfigForButtonConfig> = {
  //   name: 'button_submit',
  //   display_text: 'Submit button',
  //   type: EFieldConfigType.Button,
  //   type_config: {
  //     type: 'submit',
  //   }
  // };

  // myFormDesign: IFieldConfig<any>[] = [
  //   this.agreementAcceptanceControl,
  //   this.ageGroupControl,
  //   // this.favoriteFoodControl,
  //   this.countrySelectionControl,
  //   // this.dividerControl,
  //   this.studentArrayControl,
  //   this.profileControl,
  //   this.summaryControl,
  //   this.buttonControl,
  // ];

  // headingRender: IDivConfig<IDivConfigForHeadings> = {
  //   content: {
  //     text: 'hello World',
  //     class: 'h3'
  //   },
  //   type: EDivConfigType.Headings,
  // };
  // buttonRender: IDivConfig<IDivConfigForButton> = {
  //   content: {
  //     class: 'btn btn-primary', disabled: false, text: 'hello', onclick_fn: this.hello,
  //   },
  //   type: EDivConfigType.Button,
  // };

  // theFormRender: IDivConfig<IDivConfigForForm> = {
  //   content: {
  //     form_unique_name: 'form1',
  //     form_design: this.myFormDesign,
  //     saved_data: this.savedData,
  //   },
  //   type: EDivConfigType.Form,
  // };

  // theFormRender2: IDivConfig<IDivConfigForForm> = {
  //   content: {
  //     form_unique_name: 'form2',
  //     form_design: this.myFormDesign,
  //     saved_data: this.savedData2,
  //   },
  //   type: EDivConfigType.Form,
  // };

  // myNewSectionDesign = new Array<IDivConfig<any>>(2);

  // // mySectionDesign: IDivConfig<any>[] = [
  // //   this.headingRender,
  // //   this.buttonRender,
  // //   this.theFormRender,
  // //   this.theFormRender2,
  // // ];

  sectionConfigs = new Array<IDivConfig<IDivConfigForHeadings | IDivConfigForForm<any>>>(2);


  ngOnInit(): void {

    this.sectionConfigs[0] = {
      content: {
        text: 'Profile info',
        class: 'h3'
      },
      type: EDivConfigType.Headings,
    };

    this.sectionConfigs[1] = this.myTemplateWithData({

    });


  }

  myTemplateWithData(data: any): IDivConfig<
    IDivConfigForForm<
      IFieldConfigForInputConfig | IFieldConfigForSelectConfig | IFieldConfigForButtonConfig | IFieldConfigForTextareaConfig
    >
  > {
    return {
      content: {
        form_unique_name: 'form01',
        form_design: [
          {
            name: 'full_name',
            display_text: 'Full name: ',
            type: EFieldConfigType.Input,
            validation_fn: [Validators.required],
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' },
            },
            css_class: 'col-12'
          },
          {
            name: 'address1',
            display_text: 'Address 1: ',
            type: EFieldConfigType.Input,
            validation_fn: [Validators.required],
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-lg-6'
          },
          {
            name: 'address2',
            display_text: 'Address 2: ',
            type: EFieldConfigType.Input,
            type_config: {
              type: EFieldConfigInputType.Text,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-lg-6'
          },
          {
            name: 'country_selection',
            type: EFieldConfigType.Select,
            type_config: {
              dataset: cs,
              controls: [
                {
                  name: 'country', label: 'Country', key_field: 'key', value_field: 'value', value: '',
                  validation_fn: [Validators.required],
                },
                { name: 'state', label: 'State', key_field: 'key', value_field: 'value', value: '' },
                { name: 'city', label: 'City', key_field: 'key', value_field: 'value', value: '' },
              ],
              css_class: { group: 'col-12 col-lg-4 mb-3', select: 'form-select', select_label: 'mb-1' }
            },
            css_class: 'col-lg-10'
          },
          {
            name: 'post_code',
            display_text: 'Post code:',
            type: EFieldConfigType.Input,
            validation_fn: [Validators.min(10000), Validators.max(99999)],
            type_config: {
              type: EFieldConfigInputType.Number,
              list: false,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-lg-2'
          },
          {
            name: 'about_yourself',
            display_text: 'About yourself',
            type: EFieldConfigType.Textarea,
            validation_fn: [Validators.required],
            type_config: {
              row_count: 10,
              css_class: { group: 'form-group mb-3', group_label: '', input: 'form-control', input_label: 'mb-1' }
            },
            css_class: 'col-12'
          },
          {
            name: 'agreement',
            display_text: 'Before a user can update for the profile, its Terms and Conditions must be agreed to by checking a box:',
            type: EFieldConfigType.Input,
            validation_fn: [Validators.requiredTrue],
            type_config: {
              type: EFieldConfigInputType.CheckBox,
              list: false,
              single_checkbox_display_text: 'I agree',
              css_class: {
                group: 'form-check', group_label: 'mb-1', input: 'form-check-input', input_label: 'form-check-label'
              }
            }
          },
          {
            name: 'button_submit',
            display_text: 'Update profile',
            type: EFieldConfigType.Button,
            type_config: {
              type: 'submit',
              css_class: { group: 'd-grid gap-2 d-md-flex justify-content-md-end mt-3', button: 'btn btn-primary' }
            },
            css_class: 'col-12'
          },
        ],
        saved_data: data,
      },
      type: EDivConfigType.Form,
    };
  }

  ngAfterViewInit(): void {
    // this.dynamicSection.changes.subscribe(resp => {
    //   // detect any value changes, so that we can perform some business logic accordingly.

    // });
  }

  hello(): Promise<void> {
    return of(alert('hello world!')).toPromise();
  }

  async formOnSubmit(formValue: any): Promise<void> {
    console.log('formOnSubmit');
    console.log(formValue);
    if (!formValue.form_data.agreement) {
      alert('Do not try to by pass my validation!');
    }

  }

  async formOnChange(formValue: any): Promise<void> {
    // // console.log('formOnChange');
    // // console.log(formValue.form_data.summary);

    // const somethingNew: IDivConfig<IDivConfigForHeadings> = {
    //   content: {
    //     text: formValue.form_data.summary,
    //     class: 'h3'
    //   },
    //   type: EDivConfigType.Headings,
    // };

    // let newFormRender = this.theFormRender;
    // newFormRender = {
    //   ...newFormRender,
    //   content: {
    //     ...newFormRender.content,
    //     saved_data: {
    //       ...newFormRender.content.saved_data,
    //       accepted_agreement: !formValue.form_data.accepted_agreement,
    //       summary: formValue.form_data.summary,
    //     }
    //   },
    // };



    // newFormRender = {}

    // newFormRender.content.saved_data.accepted_agreement: !formValue.form_data.accepted_agreement

    // console.log(newFormRender);


    // this.myNewSectionDesign[0] = somethingNew;
    // this.myNewSectionDesign[1] = newFormRender;
    // this.mySectionDesign.push(somethingNew);
  }

}




    // {
    //   name: 'input_color',
    //   display_text: 'Input a color: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Color,
    //   }
    // },
    // {
    //   name: 'input_date',
    //   display_text: 'Input a date: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Date,
    //   }
    // },
    // {
    //   name: 'input_datetime_local',
    //   display_text: 'Input a datetime local: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.DateTimeLocal,
    //   }
    // },
    // {
    //   name: 'input_email',
    //   display_text: 'Input a email: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Email,
    //   }
    // },
    // {
    //   name: 'input_file',
    //   display_text: 'Input a file: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.File,
    //   }
    // },
    // {
    //   name: 'input_month',
    //   display_text: 'Input a month: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Month,
    //   }
    // },
    // {
    //   name: 'input_number',
    //   display_text: 'Input a number: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Number,
    //   }
    // },
    // {
    //   name: 'input_password',
    //   display_text: 'Input a password: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Password,
    //   }
    // },
    // // {
    // //   name: 'input_radio',
    // //   display_text: 'Input a radio: ',
    // //   type: EFieldConfigType.Input,
    // //   type_config: {
    // //     type: EFieldConfigInputType.Radio,
    // //   }
    // // },
    // {
    //   name: 'input_range',
    //   display_text: 'Input a range: ',
    //   value: 90,
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Range,
    //   }
    // },
    // {
    //   name: 'input_text',
    //   display_text: 'Input a text: ',
    //   value: 'haha',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Text,
    //   }
    // },
    // {
    //   name: 'input_time',
    //   display_text: 'Input a time: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Time,
    //   }
    // },
    // {
    //   name: 'input_week',
    //   display_text: 'Input a week: ',
    //   type: EFieldConfigType.Input,
    //   type_config: {
    //     type: EFieldConfigInputType.Week,
    //   }
    // },
    // {
    //   name: 'divider_input',
    //   type: EFieldConfigType.Divider,
    //   type_config: null,
    // },
    // {
    //   name: 'text_area',
    //   display_text: 'Text area: ',
    //   value: 'Start your long winded story here!\n\nlol',
    //   type: EFieldConfigType.Textarea,
    //   type_config: {
    //     row_count: 5,
    //     // col_count: 10,
    //   }
    // },
    // {
    //   name: 'divider_textarea',
    //   type: EFieldConfigType.Divider,
    //   type_config: null,
    // },
    // {
    //   name: 'country_selection',
    //   type: EFieldConfigType.Select,
    //   type_config: {
    //     dataset: cs,
    //     controls: [
    //       { name: 'country_selection_country', label: 'Country', key_field: 'key', value_field: 'value', value: null },
    //       { name: 'country_selection_state', label: 'State', key_field: 'key', value_field: 'value', value: null },
    //       { name: 'country_selection_city', label: 'City', key_field: 'key', value_field: 'value', value: null },
    //     ]
    //   },
    // },
    // {
    //   name: 'country_to',
    //   type: EFieldConfigType.Select,
    //   type_config: {
    //     dataset: cs,
    //     controls: [
    //       { name: 'country_to_country', label: 'Country', key_field: 'key', value_field: 'value', value: 'singapore' },
    //       { name: 'country_to_state', label: 'State', key_field: 'key', value_field: 'value', value: 'singapore' },
    //       { name: 'country_to_city', label: 'City', key_field: 'key', value_field: 'value', value: null },
    //     ]
    //   },
    // },
    // {
    //   name: 'gender_selection',
    //   type: EFieldConfigType.Select,
    //   type_config: {
    //     dataset: [
    //       { key: 'Male', value: 'male' },
    //       { key: 'Female', value: 'female' },
    //     ],
    //     controls: [
    //       { name: 'gender_selection_gender', label: 'Gender', key_field: 'key', value_field: 'value', value: null },
    //     ]
    //   },
    // },
    // {
    //   name: 'country_selections',
    //   type: EFieldConfigType.Select,
    //   type_config: {
    //     dataset: cs,
    //     controls: [
    //       { name: 'select_country', label: 'Country', key_field: 'key', value_field: 'value', value: 'singapore' },
    //       { name: 'select_state', label: 'State', key_field: 'key', value_field: 'value', value: 'singapore' },
    //       { name: 'select_city', label: 'City', key_field: 'key', value_field: 'value', value: 'singapore' },
    //     ]
    //   },
    // },




    // {
    //   name: 'divider_array',
    //   type: EFieldConfigType.Divider,
    //   type_config: null,
    // },
    // {
    //   name: 'object_something',
    //   type: EFieldConfigType.Object,
    //   type_config: {
    //     field_configs: [
    //       {
    //         name: 'object_something_input_text_firstname',
    //         display_text: 'Input your first name: ',
    //         value: 'haha',
    //         type: EFieldConfigType.Input,
    //         type_config: {
    //           type: EFieldConfigInputType.Text,
    //         }
    //       },
    //       {
    //         name: 'object_something_input_text_last',
    //         display_text: 'Input your last name: ',
    //         value: 'haha',
    //         type: EFieldConfigType.Input,
    //         type_config: {
    //           type: EFieldConfigInputType.Text,
    //         }
    //       },
    //       {
    //         name: 'gender_selection_profile',
    //         type: EFieldConfigType.Select,
    //         type_config: {
    //           dataset: [
    //             { key: 'Male', value: 'male' },
    //             { key: 'Female', value: 'female' },
    //           ],
    //           controls: [
    //             { name: 'gender_selection_profile_gender', label: 'Gender', key_field: 'key', value_field: 'value', value: null },
    //           ]
    //         },
    //       },
    //     ]
    //   },
    // },
    // {
    //   name: 'divider_object',
    //   type: EFieldConfigType.Divider,
    //   type_config: null,
    // },






    // {
    //   name: 'button_hello',
    //   display_text: 'Fire local method',
    //   type: EFieldConfigType.Button,
    //   type_config: {
    //     type: 'button',
    //     onclick_fn: this.hello,
    //   }
    // },
